import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AnswersController, PrismaModule],
  providers: [AnswersService],
})
export class AnswersModule {}
