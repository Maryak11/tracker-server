import { Header } from '@nestjs/common';
import {
  IsEmail,
  IsString,
  Length,
  IsNotEmpty,
  IsDefined,
} from 'class-validator';

export class HeaderDto {
  @IsDefined()
  readonly pool: string;
}
