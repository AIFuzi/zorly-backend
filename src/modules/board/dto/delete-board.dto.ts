import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteBoardDto {
  @IsNotEmpty()
  @IsString()
  boardId: string
}
