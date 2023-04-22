/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExpensesDto {
  @IsString()
  @IsNotEmpty()
  isim: string;

  @IsNotEmpty()
  @IsNumber()
  tutar: number;

  @IsString()
  @IsNotEmpty()
  kategori: string;

  @IsNotEmpty()
  @IsString()
  tarih: string;
}
