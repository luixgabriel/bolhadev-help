import { Module } from '@nestjs/common';
import { DoubtsService } from './doubts.service';
import { DoubtsController } from './doubts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [DoubtsController],
  providers: [DoubtsService],
  exports: [DoubtsService],
})
export class DoubtsModule {}
