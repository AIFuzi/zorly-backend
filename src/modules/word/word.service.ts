import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { CreateWordDto, UpdateWordStatsDto } from '@/src/modules/word/dto'

@Injectable()
export class WordService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateWordDto) {
    const { boardId, original, translate } = dto

    const board = await this.prismaService.board.findFirst({
      where: { id: boardId },
    })
    if (!board) {
      throw new NotFoundException(`boardId ${boardId} not found`)
    }

    return await this.prismaService.$transaction(async prisma => {
      const word = await prisma.word.create({
        data: {
          original,
          translate,
          boardId: board.id,
        },
      })

      await prisma.board.update({
        where: { id: board.id },
        data: {
          totalWords: {
            increment: 1,
          },
        },
      })

      return word
    })
  }

  async delete(id: string) {
    const isWordExist = await this.prismaService.word.findFirst({
      where: { id },
    })
    if (!isWordExist) {
      throw new NotFoundException('Word does not exist')
    }

    await this.prismaService.$transaction([
      this.prismaService.word.delete({
        where: { id },
      }),

      this.prismaService.board.update({
        where: { id: isWordExist.boardId },
        data: {
          totalWords: {
            decrement: 1,
          },
        },
      }),
    ])

    return true
  }

  async getAllByBoard(boardId: string) {
    return this.prismaService.word.findMany({
      where: {
        boardId,
      },
    })

    // return words
  }

  async updateWordStats(id: string, dto: UpdateWordStatsDto) {
    const { isCorrect } = dto

    await this.prismaService.word.update({
      where: {
        id,
      },
      data: isCorrect
        ? {
            shownCount: {
              increment: 1,
            },
            correctCount: {
              increment: 1,
            },
          }
        : {
            shownCount: {
              increment: 1,
            },
            wrongCount: {
              increment: 1,
            },
          },
    })
  }

  async getOne() {}
}
