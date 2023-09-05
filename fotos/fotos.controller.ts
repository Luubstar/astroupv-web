import { Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import { FotosService } from './fotos.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { ApiTags } from '@nestjs/swagger'; 
import { Request, Response } from 'express';
import { Req } from '@nestjs/common';

@Controller('fotos')
@ApiTags('fotos')  
export class FotosController {
  constructor(private readonly fotosService: FotosService) {}

  @Post()
  create(@Body() createFotoDto: CreateFotoDto) {
    return this.fotosService.create(createFotoDto);
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
