import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DoubtsModule } from './doubts/doubts.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AnswersModule } from './answers/answers.module';
import { GithubService } from './github/github.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'storage'),
      serveRoot: '/storage/',
    }),
    UsersModule, 
    DoubtsModule, 
    AuthModule, AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService, GithubService],
})
export class AppModule {}
