import { IsDefined } from 'class-validator';

export class HeaderDto {
  @IsDefined()
  readonly pool: string;
}
