import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  public title: string;

  @ApiProperty()
  @IsNotEmpty()
  public description: string;

  @ApiProperty({ format: 'binary', type: 'string' })
  @IsNotEmpty()
  public file: any;
}
