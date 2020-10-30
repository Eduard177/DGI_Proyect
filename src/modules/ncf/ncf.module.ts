import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { NcfController } from './ncf.controller';
import { NcfService } from './ncf.service';

@Module({
  imports: [PuppeteerModule.forRoot()],
  controllers: [NcfController],
  providers: [NcfService]
})
export class NcfModule {}
