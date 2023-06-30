import { Module } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { FotosController } from './fotos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Foto, FotoSchema } from './schemas/foto.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Foto.name, schema: FotoSchema }]), 
  ],
  controllers: [FotosController],
  providers: [FotosService]
})
export class FotosModule {}
