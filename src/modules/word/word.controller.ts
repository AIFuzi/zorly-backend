import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CreateWordDto } from '@/src/modules/word/dto'

import { WordService } from './word.service'

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post('create')
  async create(@Body() dto: CreateWordDto) {
    return this.wordService.create(dto)
  }

  @Get()
  async getAllByBoard(@Query('boardId') boardId: string) {
    return this.wordService.getAllByBoard(boardId)
  }
}
