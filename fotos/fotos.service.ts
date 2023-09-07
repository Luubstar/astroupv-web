import { Injectable } from '@nestjs/common';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Foto, FotoDocument } from './schemas/foto.schema';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { PostFotoDto } from './dto/post-foto.dto';
const { AuthorizationCode } = require('simple-oauth2');
import { GoogleDriveService } from 'nestjs-google-drive';

@Injectable()
export class FotosService {
  constructor( 
    @InjectModel(Foto.name) private readonly fotoModel: Model<FotoDocument>,
    private readonly googleDriveService: GoogleDriveService
  ) {}
  

  async checkLogIn(Nombre:string, Clave:string){
    return Nombre == "AstroUPV" && Clave == "457r0n0m14UpV";
  }

  async create(createBookDto: CreateFotoDto): Promise<Foto> { 
    return this.fotoModel.create(createBookDto); 
  }

  async post(post: PostFotoDto, image : Express.Multer.File): Promise<Foto> { 
    let link = await this.PushToDrive(image);
    let cdto = new CreateFotoDto()
    cdto.titulo = post.titulo
    cdto.autor = post.autor
    cdto.descripcion = post.descripcion
    cdto.imagen_url = link
    return this.fotoModel.create(cdto); 
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

  async PushToDrive(ImageBuffer : Express.Multer.File){
    const GOOGLE_DRIVE_FOLDER_ID = '1quX9fI79FavJY5_hnIN8gKVhjCtN23t1';
    const avatarUrl = await this.googleDriveService.uploadFile(
      ImageBuffer,
      GOOGLE_DRIVE_FOLDER_ID,
    );

    return  avatarUrl ;
  }
  

  async getToken(){
    const credentials = {
      client: {
        id: 'b121f5d5-1b77-4dc4-a168-18237394a3cf',
        secret: 'rrY8Q~1lTNZ9ScZMWJp~Xm5XWGba5kiUUuPLTdll',
      },
      auth: {
        authorizeHost: 'https://login.microsoftonline.com',
        authorizePath: '/common/oauth2/v2.0/authorize',
        tokenHost: 'https://login.microsoftonline.com',
        tokenPath: '/common/oauth2/v2.0/token',
      },
    };
    
    const oauth2 = new AuthorizationCode(credentials);
   
    const tokenParams = {
      code: 'M.C107_BAY.2.701cdcdf-f3ff-b2c3-a7f7-3033759c5fc4',
      redirect_uri: 'http://localhost:8080/callback',
    };
    
    try {
      const result = await oauth2.getToken(tokenParams);
      const accessToken = result.token.access_token;
      console.log('Token de acceso:', accessToken);
    } catch (error) {
      console.error('Error al obtener el token de acceso:', error.message);
    }
  }
}
