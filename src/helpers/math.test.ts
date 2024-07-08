import { describe, expect, it } from 'bun:test';
import { minmax } from './math';

describe('#helpers math', () => {
  describe('when using minmax', () => {
    it('should return an object with min and max values', () => {
      expect(minmax([1, 5, 2, 9, -1])).toMatchObject({ min: -1, max: 9 });
      expect(minmax([-1, 0, 2, 52, -1125])).toMatchObject({ min: -1125, max: 52 });
      expect(minmax([0, 65, 2, 52, 125])).toMatchObject({ min: 0, max: 125 });
      expect(minmax(['a', 'b', 'c'])).toMatchObject({ min: 'a', max: 'c' });
      expect(minmax(['z', 'a', 'd'])).toMatchObject({ min: 'a', max: 'z' });
    });

    it('should return an object with min and max values at undefined if the parameter is not an array', () => {
      // @ts-expect-error testing error
      expect(minmax(null)).toStrictEqual({ min: undefined, max: undefined });
      // @ts-expect-error testing error
      expect(minmax(undefined)).toStrictEqual({ min: undefined, max: undefined });
      // @ts-expect-error testing error
      expect(minmax(Number.NaN)).toStrictEqual({ min: undefined, max: undefined });
      // @ts-expect-error testing error
      expect(minmax('1, 2, 8, -1')).toStrictEqual({ min: undefined, max: undefined });
      // @ts-expect-error testing error
      expect(minmax(true)).toStrictEqual({ min: undefined, max: undefined });
      // @ts-expect-error testing error
      expect(minmax(155)).toStrictEqual({ min: undefined, max: undefined });
    });
  });
});
