import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import {
  GenerateTrainingDto,
  UpdateTrainingDto,
} from '@/src/modules/training/dto'

@Injectable()
export class TrainingService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateTraining(dto: GenerateTrainingDto) {
    const { boardId } = dto

    return this.prismaService.training.create({
      data: {
        boardId,
      },
      select: {
        id: true,
      },
    })
  }

  async getTraining(id: string) {
    return this.prismaService.training.findUnique({
      where: {
        id,
      },
      include: {
        board: {
          include: {
            words: true,
          },
        },
      },
    })
  }

  async updateTraining(id: string, dto: UpdateTrainingDto) {
    return this.prismaService.training.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    })
  }

  async getNotFinishedTrainingByBoard(boardId: string) {
    return this.prismaService.training.findFirst({
      where: {
        boardId,
        isFinished: false,
      },
    })
  }
}
