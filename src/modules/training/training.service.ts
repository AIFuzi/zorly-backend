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

  private weightedShuffle<
    T extends { correctCount: number; wrongCount: number },
  >(arr: T[]): T[] {
    return arr
      .map(word => {
        const total = word.correctCount + word.wrongCount
        const errorRate = total === 0 ? 1 : word.wrongCount / total
        const weight = errorRate + Math.random() * 0.3
        return { weight, word }
      })
      .sort((a, b) => b.weight - a.weight)
      .map(a => a.word)
  }

  async getTraining(id: string, limit: number) {
    const training = await this.prismaService.training.findUnique({
      where: { id },
      include: { board: { include: { words: true } } },
    })

    if (!training?.board?.words?.length) return training

    const shuffled = this.weightedShuffle(training.board.words)
    training.board.words = shuffled.slice(0, limit)

    return training
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
