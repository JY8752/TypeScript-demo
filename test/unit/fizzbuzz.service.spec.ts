import { Test, TestingModule } from '@nestjs/testing';
import { FizzBuzzService } from '../../src/service/fizzbuzz/fizzbuzz.service';

describe('FizzBuzzService', () => {
  let service: FizzBuzzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FizzBuzzService],
    }).compile();

    service = module.get<FizzBuzzService>(FizzBuzzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('limit is 15', () => {
      expect(service.execute(15).fizzCount).toBe(4);
      expect(service.execute(15).buzzCount).toBe(2);
      expect(service.execute(15).fizzBuzzCount).toBe(1);
    });

    test.each([
      [0, 0, 0, 0],
      [3, 1, 0, 0],
      [5, 1, 1, 0],
      [-1, 0, 0, 0],
    ])(
      'limit: %iの時, fizzCount: %i buzzCount: %i fizzBuzzCount: %i',
      (limit, fizzCount, buzzCount, fizzBuzzCount) => {
        expect(service.execute(limit).fizzCount).toBe(fizzCount);
        expect(service.execute(limit).buzzCount).toBe(buzzCount);
        expect(service.execute(limit).fizzBuzzCount).toBe(fizzBuzzCount);
      },
    );
  });
});
