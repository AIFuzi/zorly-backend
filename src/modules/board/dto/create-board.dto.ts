import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean

  @IsNotEmpty()
  @IsString()
  languageFrom: string

  @IsNotEmpty()
  @IsString()
  languageTo: string

  @IsOptional()
  @IsArray()
  tags: string[]

  @IsOptional()
  @IsString()
  board_color: string
}
