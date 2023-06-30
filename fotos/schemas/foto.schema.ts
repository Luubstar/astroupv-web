import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 

export type FotoDocument = Foto & Document; 

@Schema() 
export class Foto {
    
  @Prop()
  titulo: string;

  @Prop()
  descripcion: string;

  @Prop()
  autor: string;

  @Prop()
  imagen_url: string;
}

export const FotoSchema = SchemaFactory.createForClass(Foto); 