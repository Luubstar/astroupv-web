import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FotosService } from './fotos.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { ApiTags } from '@nestjs/swagger'; 
import { Request, Response } from 'express';
import { Req } from '@nestjs/common';
import { PostFotoDto } from './dto/post-foto.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import * as fs from 'fs';
@Controller('fotos')
@ApiTags('fotos')  
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  /*@Post()
  create(@Body() createFotoDto: CreateFotoDto) {
    return this.fotosService.create(createFotoDto);
  }*/

  @Post("/test")
  
  test(@Res() res : Response) {
    let token = this.fotosService.getToken()
  }

  @Post("/post/:nombre/:clave/:autor/:descripcion/:titulo")
  @UseInterceptors(FileInterceptor('image', { 
    storage: diskStorage({
    destination: './uploads',
    filename(req, file, callback) {
      callback(null, file.filename + ".png")
    },
  })
  }))
  async post( @UploadedFile() image : Express.Multer.File, @Param('nombre') nombre: string, @Param('clave') clave: string,@Param('autor') autor: string, @Param('descripcion') descrpcion: string,@Param('titulo') titulo: string) {
    let postDTO = new PostFotoDto()
    postDTO.titulo = titulo
    postDTO.autor = autor
    postDTO.descripcion = descrpcion
    var res;
    if(this.fotosService.checkLogIn(nombre,clave)) {res = await this.fotosService.post(postDTO, image);}
    fs.unlinkSync(image.path)
    return res;
  }



  @Get()
  findAll(@Req() request: Request) { 
    return this.fotosService.findAll(request); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fotosService.findOne(id);
  }

  @Get(":nombre/:clave")
  login(@Param('nombre') nombre: string, @Param('clave') clave: string, @Res() res : Response){
    if (this.fotosService.checkLogIn(nombre, clave)){res.sendStatus(200);}
  }

  @Patch(':nombre/:clave/:id')
  update(@Param('id') id: string, @Param('nombre') nombre: string, @Param('clave') clave: string, @Body() updateFotoDto: UpdateFotoDto) {
    return this.fotosService.update(id, updateFotoDto);
  }

  @Delete(':nombre/:clave/:id')
  remove(@Param('id') id: string, @Param('nombre') nombre: string, @Param('clave') clave: string) {
    if(this.fotosService.checkLogIn(nombre, clave)){
      return this.fotosService.remove(id);
    }
  }
}
