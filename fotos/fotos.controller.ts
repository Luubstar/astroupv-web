import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FotosService } from './fotos.service';
import { CreateFotoDto } from './dto/create-foto.dto';
import { UpdateFotoDto } from './dto/update-foto.dto';
import { ApiTags } from '@nestjs/swagger'; 
import { Request } from 'express';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFotoDto: UpdateFotoDto) {
    return this.fotosService.update(id, updateFotoDto);
  }

  @Delete(':nombre/:clave/:id')
  remove(@Param('id') id: string, @Param('nombre') nombre: string, @Param('clave') clave: string) {
    if(nombre == "PabloE" && clave == "457r0n0m14UpV"){
      return this.fotosService.remove(id);
    }
  }
}
