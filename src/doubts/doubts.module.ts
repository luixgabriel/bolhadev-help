import { Module } from '@nestjs/common';
import { DoubtsService } from './doubts.service';
import { DoubtsController } from './doubts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [DoubtsController],
  providers: [DoubtsService],
  exports: [DoubtsService],
})
export class DoubtsModule {}
