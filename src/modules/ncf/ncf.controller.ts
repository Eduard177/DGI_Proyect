/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get } from '@nestjs/common';
import { NcfService } from './ncf.service';

@Controller('ncf')
export class NcfController {
    constructor(private readonly ncfService: NcfService) {}
    @Get()
    async nfc(@Body() payload){
        return this.ncfService.fetchRncDataByWebScrapping('https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ncf.aspx',payload.rnc, payload.ncf);
    }
}
