import { IsEmail, IsDefined } from 'class-validator';

export class OneDto {
  @IsDefined()
  @IsEmail()
  readonly pool: string;
}
