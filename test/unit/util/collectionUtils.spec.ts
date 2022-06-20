import { generixMap, map } from '../../../src/util/collectionUtils';

describe('collectionUtilsTest', () => {
  describe('map', () => {
    it('値が全て想定通りであること', () => {
      const result = map([1, 2, 3, 4, 5], (num) => num * num);
      expect(result).toHaveLength(5);
      expect(result).toEqual(expect.arrayContaining([1, 4, 9, 16, 25]));
    });
  });
  describe('generixMap', () => {
    it('should be normal', () => {
      const result = generixMap([1, 2, 3, 4, 5], (num: number) =>
        num.toString(),
      );
      expect(result).toEqual(expect.arrayContaining(['1', '2', '3', '4', '5']));
    });
  });
});
