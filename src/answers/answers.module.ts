import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { DoubtsModule } from 'src/doubts/doubts.module';

@Module({
  imports: [PrismaModule, UsersModule, DoubtsModule],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
