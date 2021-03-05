/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Post } from '@nestjs/common';
import { NcfService } from './ncf.service';

@Controller('ncf')
export class NcfController {
    constructor(private readonly ncfService: NcfService) {}
    @Post()
    async ncf(@Body() payload: any){
        return this.ncfService.fetchRncDataByWebScrapping('https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ncf.aspx',payload.rnc, payload.ncf);
    }
}
