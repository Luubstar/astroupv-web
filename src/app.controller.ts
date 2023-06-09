import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHideProperty, ApiOperation } from '@nestjs/swagger';
import { ignoreElements } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return "Si estás viendo este error es que ha habido un problema al cargar el servidor. Contacta con el administrador del sitio (Nicolás B)" ;
  }
}
