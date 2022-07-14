import {
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class QueryDto {
  @IsNumberString()
  readonly page: number;
  @IsOptional()
  @IsString()
  readonly filter: string;
  @IsOptional()
  @IsDateString()
  readonly dateFrom: string;
  @IsOptional()
  @IsDateString()
  readonly dateTo: string;
}
