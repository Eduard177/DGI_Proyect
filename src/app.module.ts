import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapingService } from './modules/RNC/RNC.service';
import { ScrapingController } from './modules/RNC/RNC.controller';
import { ScrapingModule } from './modules/RNC/RNC.module';

@Module({
  imports: [ScrapingModule],
  controllers: [AppController, ScrapingController],
  providers: [AppService, ScrapingService],
})
export class AppModule {}
