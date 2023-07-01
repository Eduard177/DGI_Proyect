import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { NcfController } from './ncf.controller';
import { NcfService } from './ncf.service';
import { ConfigModule } from "../../config/config.module";

@Module({
  imports: [PuppeteerModule.forRoot(), ConfigModule],
  controllers: [NcfController],
  providers: [NcfService]
})
export class NcfModule {}
