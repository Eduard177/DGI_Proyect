import { Controller, Get, Query } from '@nestjs/common';
import { RncService } from './rnc.service';

@Controller('rnc')
export class RncController {
    constructor(private readonly rncService: RncService) {}
    @Get()
    async rnc(@Query('rnc') rnc: string){
        return this.rncService.fetchRncDataByWebScrapping(
          process.env.URL_RNC_DGI,
          rnc,
        );
    }
}