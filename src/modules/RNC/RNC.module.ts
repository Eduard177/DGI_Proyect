import { Module } from '@nestjs/common';
import {ScrapingController} from './RNC.controller'
import {ScrapingService} from './RNC.service'
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
    imports: [PuppeteerModule.forRoot()],
    controllers: [ScrapingController],
    providers: [ScrapingService]
})
export class ScrapingModule {}
