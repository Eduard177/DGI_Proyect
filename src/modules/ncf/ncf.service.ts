import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectPage } from 'nest-puppeteer';
import type { Page } from 'puppeteer';
import { NcfFetchedDataInterface } from './interfaces/ncfFetchedData.interface';
import { ConfigModule } from "../../config/config.module";
import { ConfigService } from "../../config/config.service";
import { Configuration } from "../../config/config.keys";

@Injectable()
export class NcfService {
    constructor(@InjectPage() private readonly page: Page, private readonly configService: ConfigService) {}

    async fetchRncDataByWebScrapping( rnc: string, ncf: string) : Promise<NcfFetchedDataInterface> {
        await this.crawl();
        await this.foundValue(rnc, ncf);
        return this.isValue();
    }

    async crawl() : Promise<void>{
          await this.page.goto(
            this.configService.get(Configuration.URL_NCF_DGI),
            { waitUntil: 'load', timeout: 0 },
          );
        await this.page.content();
          
    }
        
    async foundValue(rnc: string, ncf: string) : Promise<void>{
        if(!rnc){
            throw new BadRequestException('RNC cannot be null')
        }
        if(!ncf){
            throw new BadRequestException('NFC cannot be null')
        }
          await this.page.type('#cphMain_txtRNC', rnc);
          await this.page.type('#cphMain_txtNCF', ncf);
          await this.page.click('#cphMain_btnConsultar');
          await this.page.waitForSelector('#cphMain_pResultado')
    }

    async isValue() : Promise<NcfFetchedDataInterface>  {
        const isValue = await this.page.evaluate(()=>{
            return document.querySelector('#cphMain_pResultado')
        })

        if(!isValue){
            throw new NotFoundException('Not found RNC')
        }

        const ncfData = await this.page.evaluate(() =>  Array.from(
          document.querySelectorAll('table tbody tr td span'))
          .map(td => td.innerHTML)
        );
        return this.nfcDataFiltering(ncfData);
    }

    nfcDataFiltering(payload :Array<string>) : NcfFetchedDataInterface{
        return {
            rnc: payload[0],
            socialR: payload[1],
            ncfType: payload[2],
            ncf: payload[3],
            status: payload[4],
            validTime: payload[5],
        }

    }
    
}
