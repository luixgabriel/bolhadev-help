import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DoubtsModule } from './doubts/doubts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, DoubtsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
