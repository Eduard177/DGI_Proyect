/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get } from '@nestjs/common';
import { NcfService } from './ncf.service';

@Controller('ncf')
export class NcfController {
    constructor(private readonly ncfService: NcfService) {}
    @Get()
    async nfc(){
        return this.ncfService.crawl('https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ncf.aspx',"130192731", "B0101423363");
    }
}
