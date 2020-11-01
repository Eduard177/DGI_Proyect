/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectPage } from 'nest-puppeteer';
import type { Page } from 'puppeteer';

@Injectable()
export class RncService {
    constructor(@InjectPage() private readonly page: Page) {}

    async crawl(url: string, RNC: string){
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.page.content();
        await this.foundValue(RNC)
    };
    
    async foundValue(RNC: string){
        await this.page.type("#ctl00_cphMain_txtRNCCedula",RNC)
        await this.page.click('#ctl00_cphMain_btnBuscarPorRNC')
        await this.page.waitFor(3000)
        await this.isValue()
    }
    async isValue(){
        const isValue = await this.page.evaluate(()=>{
            const RNC = document.querySelector('#ctl00_cphMain_dvDatosContribuyentes > tbody')
            return RNC
        })
        if(!isValue){
            throw new NotFoundException('Not found RNC')
        }else{
            const data = await this.page.evaluate(() => {
                const tds = Array.from(document.querySelectorAll('table tbody tr td'))
                  return tds.map(td => td.innerHTML)
              });
              console.log(data);
        }
    }

}