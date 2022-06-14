import { Module } from '@nestjs/common';
import { FizzBuzzService } from 'src/service/fizzbuzz/fizzbuzz.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FizzBuzzService],
})
export class FizzBuzzModule {}
