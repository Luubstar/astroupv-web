import { ApiProperty } from '@nestjs/swagger';
export class CreateFotoDto {
  @ApiProperty({ 
    example: 'Foto de la luna',
  })
  titulo: string; 

  @ApiProperty({
    example:
      'Una foto de la luna sacada por la NASA',
  })
  descripcion: string;

  @ApiProperty({ example: 'NASA' })
  autor: string;

  @ApiProperty({
    example: 'https://es.wikipedia.org/wiki/Luna',
  })
  imagen_url: string;

}