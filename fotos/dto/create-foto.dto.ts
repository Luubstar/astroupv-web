import { ApiProperty } from '@nestjs/swagger';
export class CreateFotoDto {
  @ApiProperty({ 
    example: 'Foto de la Luna',
  })
  readonly titulo: string; 

  @ApiProperty({ example: 'Web Development' })
  readonly genre: string;

  @ApiProperty({
    example:
      'Una foto de la luna sacada de la wikipedia',
  })
  readonly description: string;

  @ApiProperty({ example: 'ET el alien' })
  readonly autor: string;

  @ApiProperty({
    example: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Full_Moon_Luc_Viatour.jpg/280px-Full_Moon_Luc_Viatour.jpg',
  })
  readonly imagen_url: string;
}