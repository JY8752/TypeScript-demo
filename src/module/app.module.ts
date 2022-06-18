import { Module } from '@nestjs/common';
import { FizzBuzzService } from 'src/service/fizzbuzz/fizzbuzz.service';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, FizzBuzzService],
})
export class AppModule {}
