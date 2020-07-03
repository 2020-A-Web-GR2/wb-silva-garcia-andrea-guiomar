import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http.module";

@Module({
  imports: [
      HttpJuegoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
