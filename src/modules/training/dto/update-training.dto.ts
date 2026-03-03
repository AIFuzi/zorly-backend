import { IsNotEmpty } from 'class-validator'

export class UpdateTrainingDto {
  @IsNotEmpty()
  correctAnswers: number

  @IsNotEmpty()
  incorrectAnswers: number

  @IsNotEmpty()
  skippedAnswers: number

  @IsNotEmpty()
  currentIssue: number

  @IsNotEmpty()
  isFinished: boolean
}
