import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectPage } from 'nest-puppeteer';
import  { Page}  from 'puppeteer';
import { RncFetchedDataInterface } from './interfaces/rncFetchedData.interface';

@Injectable()
export class RncService {
    constructor(@InjectPage() private readonly page: Page) {}

    async fetchRncDataByWebScrapping(url: string, rnc: string) : Promise<RncFetchedDataInterface> {
        await this.crawl(url);
        await this.foundValue(rnc);
        return await this.isValue();
    }

    async crawl(url: string) : Promise<void>{
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.page.content();
    };
    
    async foundValue(rnc : string) : Promise<void> {
        await this.page.type("#ctl00_cphMain_txtRNCCedula",rnc )
        await this.page.click('#ctl00_cphMain_btnBuscarPorRNC')
        await this.page.waitFor(500)
    }

    async isValue() : Promise<RncFetchedDataInterface>  {
        const isValue = await this.page.evaluate(()=>{
            return document.querySelector('#ctl00_cphMain_dvDatosContribuyentes > tbody')
        })

        if(!isValue){
            throw new NotFoundException('Not found RNC')
        }

        const rncData = await this.page.evaluate(() =>  Array.from(
              document.querySelectorAll('table tbody tr td'))
          .map(td => td.innerHTML)
        );
        return this.rncDataFiltering(rncData);
    }

     rncDataFiltering (payload: Array<string>) : RncFetchedDataInterface  {
      return  {
           businessName: payload[5],
           economyActivity: payload[13],
           rnc: payload[1],
           socialR: payload[3],
           status: payload[11]
         }
    }
}