import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { GenerateTrainingDto } from '@/src/modules/training/dto'
import { UpdateTrainingDto } from '@/src/modules/training/dto/update-training.dto'

import { TrainingService } from './training.service'

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('generate')
  async generateTraining(@Body() dto: GenerateTrainingDto) {
    return await this.trainingService.generateTraining(dto)
  }

  @Get(':id')
  async getTraining(@Param('id') id: string) {
    return await this.trainingService.getTraining(id)
  }

  @Get('training/:id')
  async getNotFinishedTrainingByBoard(@Param('id') id: string) {
    return await this.trainingService.getNotFinishedTrainingByBoard(id)
  }

  @Patch(':id')
  async updateTraining(
    @Param('id') id: string,
    @Body() dto: UpdateTrainingDto,
  ) {
    return await this.trainingService.updateTraining(id, dto)
  }
}
