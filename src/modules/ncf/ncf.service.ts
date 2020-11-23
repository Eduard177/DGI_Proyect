/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectPage } from 'nest-puppeteer';
import type { Page } from 'puppeteer';
import { NcfFetchedDataInterface } from './interfaces/ncfFetchedData.interface';

@Injectable()
export class NcfService {
    constructor(@InjectPage() private readonly page: Page) {}

    async fetchRncDataByWebScrapping(url: string, rnc: string, ncf: string) : Promise<NcfFetchedDataInterface> {
        await this.crawl(url);
        await this.foundValue(rnc, ncf);
        return await this.isValue();
    }

    async crawl(url: string){
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.page.content();
    };
        
    async foundValue(rnc: string, ncf: string){
        await this.page.type("#cphMain_txtRNC",rnc);
        await this.page.type("#cphMain_txtNCF",ncf);
        await this.page.click('#cphMain_btnConsultar');
        await this.page.waitFor(3000);
        await this.isValue();
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
