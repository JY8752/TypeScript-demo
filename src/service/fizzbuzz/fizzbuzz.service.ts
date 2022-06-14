import { Injectable } from '@nestjs/common';
import { FizzBuzzResult } from 'src/interfaces/fizzbuzz.interface';

@Injectable()
export class FizzBuzzService {
  execute(limit: number): FizzBuzzResult {
    let counter = 0;
    const result: FizzBuzzResult = {
      fizzCount: 0,
      buzzCount: 0,
      fizzBuzzCount: 0,
    };

    while (counter < limit) {
      counter++;
      if (counter % 3 === 0 && counter % 5 === 0) {
        result.fizzBuzzCount++;
      } else if (counter % 3 === 0) {
        result.fizzCount++;
      } else if (counter % 5 === 0) {
        result.buzzCount++;
      } else {
        //nop
      }
    }
    return result;
  }
}
