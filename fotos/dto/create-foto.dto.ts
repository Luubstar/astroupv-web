import { ApiProperty } from '@nestjs/swagger';
export class CreateFotoDto {
  @ApiProperty({ 
    example: 'Foto de la luna',
  })
  readonly titulo: string; 

  @ApiProperty({
    example:
      'Una foto de la luna sacada por la NASA',
  })
  readonly descripcion: string;

  @ApiProperty({ example: 'NASA' })
  readonly autor: string;

  @ApiProperty({
    example: 'https://es.wikipedia.org/wiki/Luna',
  })
  readonly imagen_url: string;

}