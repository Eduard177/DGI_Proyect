/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get } from '@nestjs/common';
import { RncDTO } from './dto/rnc.dto';
import { RncService } from './rnc.service';

@Controller('rnc')
export class RncController {
    constructor(private readonly rncService: RncService) {}
    @Get()
    async rnc(@Body() rncDto: RncDTO){
        return this.rncService.crawl('https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx#',rncDto.RNC);
    }
}