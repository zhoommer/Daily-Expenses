/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExpensesDto {

  @IsNotEmpty()
  @IsString()
  isim: string;

  @IsNotEmpty()
  @IsNumber()
  tutar: number;

  @IsNotEmpty()
  @IsString()
  kategori: string;

  @IsNotEmpty()
  @IsString()
  tarih: string;
}
