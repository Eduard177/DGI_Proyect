import { Body, Controller, Get } from '@nestjs/common';
import { RncService } from './rnc.service';

@Controller('rnc')
export class RncController {
    constructor(private readonly rncService: RncService) {}
    @Get()
    async rnc(@Body() payload){
        return this.rncService.fetchRncDataByWebScrapping(
          'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx#'
          ,payload.rnc);
    }
}