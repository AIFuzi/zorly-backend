import { IsNotEmpty, IsString } from 'class-validator'

export class CreateWordDto {
  @IsNotEmpty()
  @IsString()
  original: string

  @IsNotEmpty()
  @IsString()
  translate: string

  @IsNotEmpty()
  @IsString()
  boardId: string
}
