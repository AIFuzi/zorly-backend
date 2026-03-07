import { IsNotEmpty } from 'class-validator'

export class CreateTrainingStatisticDto {
  @IsNotEmpty()
  correctAnswers: number

  @IsNotEmpty()
  incorrectAnswers: number

  @IsNotEmpty()
  skippedAnswers: number

  @IsNotEmpty()
  trainingId: string
}
