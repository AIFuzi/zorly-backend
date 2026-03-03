import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateBoardDto } from '@/src/modules/board/dto'

import { BoardService } from './board.service'

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('create')
  async create(@Body() dto: CreateBoardDto) {
    return this.boardService.create(dto)
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.boardService.delete(id)
  }

  @Get()
  async findAll() {
    return this.boardService.getAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.boardService.getOne(id)
  }
}
