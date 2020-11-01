import { Module } from '@nestjs/common';
import {RncController} from './rnc.controller'
import {RncService} from './rnc.service'
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
    imports: [PuppeteerModule.forRoot()],
    controllers: [RncController],
    providers: [RncService]
})
export class RncModule {}
