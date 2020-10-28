/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get } from '@nestjs/common';
import { ScrapingService } from './RNC.service';

@Controller('scraping')
export class ScrapingController {
    constructor(private readonly scrapingService: ScrapingService) {}
    @Get('test1')
    async test(){
        return this.scrapingService.crawl('https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx#','130627267');
    }
}
