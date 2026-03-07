import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateTrainingStatisticDto } from '@/src/modules/statistic/training-statistic/dto'

import { TrainingStatisticService } from './training-statistic.service'

@Controller('training-statistic')
export class TrainingStatisticController {
  constructor(
    private readonly trainingStatisticService: TrainingStatisticService,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateTrainingStatisticDto) {
    return this.trainingStatisticService.create(dto)
  }

  @Get(':id')
  async getStatistic(@Param('id') id: string) {
    return this.trainingStatisticService.getStatistics(id)
  }
}
