import { Injectable } from '@nestjs/common';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Foto, FotoDocument } from './schemas/foto.schema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class FotosService {
  constructor( 
    @InjectModel(Foto.name) private readonly fotoModel: Model<FotoDocument>, 
  ) {}

  async checkLogIn(Nombre:string, Clave:string){
    return Nombre == "AstroUPV" && Clave == "457r0n0m14UpV";
  }

  async create(createBookDto: CreateFotoDto): Promise<Foto> { 
    return this.fotoModel.create(createBookDto); 
  }

  async findAll(request: Request): Promise<Foto[]> { 
    return this.fotoModel
      .find(request.query) 
      .setOptions({ sanitizeFilter: true }) 
      .exec();
  }

  async findOne(id: string): Promise<Foto> { 
    return this.fotoModel.findOne({ _id: id }).exec(); 
  }

  async update(id: string, updateBookDto: UpdateFotoDto): Promise<Foto> { 
    return this.fotoModel.findOneAndUpdate({ _id: id }, updateBookDto, { 
      new: true, 
    });
  }

  async remove(id: string) { 
    return this.fotoModel.findByIdAndRemove({ _id: id }).exec(); 
  }
}