/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Post } from '@nestjs/common';
import { RncService } from './rnc.service';

@Controller('rnc')
export class RncController {
    constructor(private readonly rncService: RncService) {};
    @Post()
    async rnc(@Body() payload: any){
        return this.rncService.fetchRncDataByWebScrapping('https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx#',payload.rnc);
    }
}