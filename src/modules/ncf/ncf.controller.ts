import { Controller, Get, Query } from '@nestjs/common';
import { NcfService } from './ncf.service';

@Controller('ncf')
export class NcfController {
    constructor(private readonly ncfService: NcfService) {}
    @Get()
    async ncf(@Query('rnc') rnc: string, @Query('ncf') ncf: string){
        return this.ncfService.fetchRncDataByWebScrapping(
          process.env.URL_NCF_DGI,
          rnc,
          ncf,
        );
    }
}
