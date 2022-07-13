import { Header } from '@nestjs/common';
import {
  IsEmail,
  IsString,
  Length,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';

export class OneDto {
  @IsDefined()
  @IsEmail()
  readonly pool: string;
}
