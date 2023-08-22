import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DoubtsModule } from './doubts/doubts.module';

@Module({
  imports: [UsersModule, DoubtsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
