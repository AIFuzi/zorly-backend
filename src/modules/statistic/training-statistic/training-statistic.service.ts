import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { CreateTrainingStatisticDto } from '@/src/modules/statistic/training-statistic/dto'

@Injectable()
export class TrainingStatisticService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateTrainingStatisticDto) {
    return this.prismaService.trainingStatistic.create({
      data: {
        ...dto,
      },
    })
  }

  async getStatistics(id: string) {
    return this.prismaService.trainingStatistic.findFirst({
      where: {
        id,
      },
    })
  }
}
