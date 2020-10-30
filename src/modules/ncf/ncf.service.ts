/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectPage } from 'nest-puppeteer';
import type { Page } from 'puppeteer';

@Injectable()
export class NcfService {
    constructor(@InjectPage() private readonly page: Page) {}  

    async crawl(url: string, RNC: string, NFC: string){
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.page.content();
        await this.foundValue(RNC, NFC);
    };
        
    async foundValue(RNC: string, NCF: string){
        await this.page.type("#cphMain_txtRNC",RNC);
        await this.page.type("#cphMain_txtNCF",NCF);
        await this.page.click('#cphMain_btnConsultar');
        await this.page.waitFor(3000);
        await this.isValue();
    }

    async isValue(){
        const isValue = await this.page.evaluate(()=>{
            const NCF = document.querySelector('#cphMain_pResultado')
            return NCF
        })
        if(!isValue){
            throw new NotFoundException('Not found NCF')
        }
    }
    
}
