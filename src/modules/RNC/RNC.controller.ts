/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get } from '@nestjs/common';
import { RncService } from './rnc.service';

@Controller('scraping')
export class RncController {
    constructor(private readonly rncService: RncService) {}
    @Get('rnc')
    async test(){
        return this.rncService.crawl('https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx#','130627267');
    }
}
