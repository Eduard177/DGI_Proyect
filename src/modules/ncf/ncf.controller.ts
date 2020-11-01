/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get } from '@nestjs/common';
import { NfcDTO } from './dto/nfc.dto';
import { NcfService } from './ncf.service';

@Controller('ncf')
export class NcfController {
    constructor(private readonly ncfService: NcfService) {}
    @Get()
    async nfc(@Body() nfcDTO: NfcDTO){
        return this.ncfService.crawl('https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/ncf.aspx',nfcDTO.RNC, nfcDTO.NFC);
    }
}
