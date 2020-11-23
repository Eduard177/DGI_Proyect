import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RncService } from './modules/rnc/rnc.service';
import { RncController } from './modules/rnc/rnc.controller';
import { RncModule } from './modules/rnc/rnc.module';
import { NcfModule } from './modules/ncf/ncf.module';

@Module({
  imports: [RncModule, NcfModule],
  controllers: [AppController, RncController],
  providers: [RncService],
})
export class AppModule {}
