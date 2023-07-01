import { Module } from '@nestjs/common';
import {RncController} from './rnc.controller'
import {RncService} from './rnc.service'
import { PuppeteerModule } from 'nest-puppeteer';
import { ConfigModule } from 'src/config/config.module';

@Module({
    imports: [PuppeteerModule.forRoot(), ConfigModule],
    controllers: [RncController],
    providers: [RncService]
})
export class RncModule {}
