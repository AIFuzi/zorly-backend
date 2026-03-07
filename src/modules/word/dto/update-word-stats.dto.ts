import { Type } from 'class-transformer'
import { IsBoolean } from 'class-validator'

export class UpdateWordStatsDto {
  @IsBoolean()
  @Type(() => Boolean)
  isCorrect: boolean
}
