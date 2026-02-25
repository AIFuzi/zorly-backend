import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { CreateWordDto } from '@/src/modules/word/dto'

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

    return this.prismaService.word.create({
      data: {
        original,
        translate,
        board: {
          connect: { id: board.id },
        },
      },
    })
  }

  async delete() {}

  async getAllByBoard(boardId: string) {
    const words = await this.prismaService.word.findMany({
      where: {
        boardId,
      },
    })
    if (words.length <= 0) {
      throw new NotFoundException()
    }

    return words
  }

  async getOne() {}
}
