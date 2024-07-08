import { describe, expect, it } from 'bun:test';
import { isColor } from './color';

describe('#helpers color', () => {
  describe('when using isColor', () => {
    it('should return true if the string is a valid hex color code', () => {
      expect(isColor('#8C0354')).toBeTrue();
      expect(isColor('#8c0354')).toBeTrue();
      expect(isColor('#BBF2DF')).toBeTrue();
      expect(isColor('#bbf2df')).toBeTrue();
      expect(isColor('#BADA55')).toBeTrue();
      expect(isColor('#bada55')).toBeTrue();
      expect(isColor('#6495ED')).toBeTrue();
      expect(isColor('#6495ed')).toBeTrue();
    });

    it('should return true if the string is a valid generic color name', () => {
      expect(isColor('aliceblue')).toBeTrue();
      expect(isColor('yellow')).toBeTrue();
      expect(isColor('red')).toBeTrue();
      expect(isColor('green')).toBeTrue();
      expect(isColor('blue')).toBeTrue();
      expect(isColor('green')).toBeTrue();
      expect(isColor('black')).toBeTrue();
      expect(isColor('white')).toBeTrue();
      expect(isColor('pink')).toBeTrue();
      expect(isColor('purple')).toBeTrue();
      expect(isColor('grey')).toBeTrue();
      expect(isColor('brown')).toBeTrue();
      expect(isColor('salmon')).toBeTrue();
      expect(isColor('none')).toBeTrue();
    });

    it('should return false if the string is not a valid hex color code', () => {
      expect(isColor('##8C0354')).toBeFalse();
      expect(isColor('#8G0354')).toBeFalse();
      expect(isColor('#TTF2DF')).toBeFalse();
      expect(isColor('#bbf2dx')).toBeFalse();
      expect(isColor('')).toBeFalse();
      expect(isColor('#bada555')).toBeFalse();
    });

    it('should return false if the string is not a valid generic color name', () => {
      expect(isColor('alicebluex')).toBeFalse();
      expect(isColor('yellowstone')).toBeFalse();
      expect(isColor('redpurple')).toBeFalse();
      expect(isColor('greenindian')).toBeFalse();
      expect(isColor('bluemonster')).toBeFalse();
    });

    it('should return false if the string is empty', () => {
      expect(isColor('')).toBeFalse();
    });

    it('should return false if parameter is null', () => {
      expect(isColor(null)).toBeFalse();
    });

    it('should return false if parameter is undefined', () => {
      expect(isColor(undefined)).toBeFalse();
    });

    it('should return false if parameter is NaN', () => {
      expect(isColor(Number.NaN)).toBeFalse();
    });
  });
});
