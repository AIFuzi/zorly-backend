import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { CreateBoardDto, DeleteBoardDto } from '@/src/modules/board/dto'

@Injectable()
export class BoardService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateBoardDto) {
    return this.prismaService.board.create({
      data: {
        ...dto,
      },
    })
  }

  async delete(dto: DeleteBoardDto) {
    const { boardId: id } = dto

    const isBoardExists = await this.prismaService.board.findFirst({
      where: { id },
    })
    if (!isBoardExists) {
      throw new NotFoundException(`Can't find a board`)
    }

    await this.prismaService.board.delete({
      where: {
        id,
      },
    })

    return true
  }

  async getAll() {
    return this.prismaService.board.findMany({
      where: {
        isPublic: true,
      },
    })
  }

  async getOne(id: string) {
    const board = await this.prismaService.board.findFirst({
      where: {
        id,
      },
    })
    if (!board) {
      throw new NotFoundException(`Can't find a board`)
    }

    return board
  }
}
