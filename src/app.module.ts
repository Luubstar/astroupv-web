import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FotosModule } from 'fotos/fotos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://astroupv:457r0n0m14UpV@astroupv.yhek4as.mongodb.net/db'), 
  FotosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
