import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from '@/src/core/prisma/prisma.module'
import { BoardModule } from '@/src/modules/board/board.module'
import { TrainingStatisticModule } from '@/src/modules/statistic/training-statistic/training-statistic.module'
import { TrainingModule } from '@/src/modules/training/training.module'
import { WordModule } from '@/src/modules/word/word.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BoardModule,
    WordModule,
    TrainingModule,
    TrainingStatisticModule,
  ],
})
export class CoreModule {}
