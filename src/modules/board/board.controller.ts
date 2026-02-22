import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateBoardDto } from '@/src/modules/board/dto'
import { DeleteBoardDto } from '@/src/modules/board/dto/delete-board.dto'

import { BoardService } from './board.service'

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('create')
  async create(@Body() dto: CreateBoardDto) {
    return this.boardService.create(dto)
  }

  @Delete('delete')
  async delete(@Body() dto: DeleteBoardDto) {
    return this.boardService.delete(dto)
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
