import { Module } from '@nestjs/common';
import { TrainingStatisticService } from './training-statistic.service';
import { TrainingStatisticController } from './training-statistic.controller';

@Module({
  controllers: [TrainingStatisticController],
  providers: [TrainingStatisticService],
})
export class TrainingStatisticModule {}
