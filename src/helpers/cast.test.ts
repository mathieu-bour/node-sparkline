import { describe, expect, it } from 'bun:test';
import { num, number } from './cast';

describe('#helpers cast', () => {
  describe('when using number', () => {
    it('should return the primitive number value of a number', () => {
      expect(number(0)).toBe(0);
      expect(number(1)).toBe(1);
      expect(number(new Number(0))).toBe(0);
      expect(number(new Number(1))).toBe(1);
      expect(number(new Number(5))).toBe(5);
      expect(number(Number(0))).toBe(0);
      expect(number(Number(1))).toBe(1);
      expect(number(Number(5))).toBe(5);
      expect(number(5.5)).toBe(5.5);
      expect(number(0xff)).toBe(255);
      expect(number(0b111110111)).toBe(503);
      expect(number(0o767)).toBe(503);
    });

    it('should return the primitive number value of a string representing a number', () => {
      expect(number('0')).toBe(0);
      expect(number('1')).toBe(1);
      expect(number('5')).toBe(5);
      expect(number('5.5')).toBe(5.5);
      expect(number('0xFF')).toBe(255);
      expect(number('0b111110111')).toBe(503);
      expect(number('0o767')).toBe(503);
    });

    it('should return the primitive number value of a boolean', () => {
      expect(number(true)).toBe(1);
      expect(number(false)).toBe(0);
      expect(number(new Boolean(true))).toBe(1);
      expect(number(new Boolean(false))).toBe(0);
      expect(number(Boolean(1))).toBe(1);
      expect(number(Boolean(0))).toBe(0);
    });

    it('should return undefined when casting an infinite number', () => {
      expect(number(Number.POSITIVE_INFINITY)).toBeUndefined();
      expect(number(Number.NEGATIVE_INFINITY)).toBeUndefined();
      expect(number('Infinity')).toBeUndefined();
      expect(number('-Infinity')).toBeUndefined();
    });

    it('should return undefined when casting a symbol', () => {
      expect(number(Symbol('s'))).toBeUndefined();
    });

    it('should return undefined when casting a function', () => {
      expect(number(function f() {})).toBeUndefined();
    });

    it('should return undefined when casting a class', () => {
      expect(number(class c {})).toBeUndefined();
    });

    it('should return undefined when casting an error', () => {
      expect(number(new Error('error'))).toBeUndefined();
    });

    it('should return undefined when casting an array', () => {
      expect(number([])).toBeUndefined();
      expect(number([1, 2, 3])).toBeUndefined();
      expect(
        number([
          [1, 2],
          [3, 4, 5],
        ]),
      ).toBeUndefined();
      expect(number(Array(5))).toBeUndefined();
      expect(number(new Array(1, 2, 3))).toBeUndefined();
    });

    it('should return undefined when casting an object', () => {
      expect(number({})).toBeUndefined();
      expect(number({ x: 5 })).toBeUndefined();
      // @ts-expect-error testing purposes
      expect(number(new (function () {})())).toBeUndefined();
    });

    it('should return undefined when casting a map', () => {
      expect(number(new Map())).toBeUndefined();
    });

    it('should return undefined when casting a set', () => {
      expect(number(new Set())).toBeUndefined();
    });

    it('should return undefined when casting a weakmap', () => {
      expect(number(new WeakMap())).toBeUndefined();
    });

    it('should return undefined when casting a weakset', () => {
      expect(number(new WeakSet())).toBeUndefined();
    });

    it('should return undefined when casting undefined', () => {
      expect(number(undefined)).toBeUndefined();
    });

    it('should return undefined when casting null', () => {
      expect(number(null)).toBeUndefined();
    });

    it('should return undefined when casting NaN', () => {
      expect(number(Number.NaN)).toBeUndefined();
    });
  });

  describe('when using num (that uses number function)', () => {
    it('should return the primitive number value of a number', () => {
      expect(num(0)).toBe(0);
      expect(num(1)).toBe(1);
      expect(num(new Number(0))).toBe(0);
      expect(num(new Number(1))).toBe(1);
      expect(num(new Number(5))).toBe(5);
      expect(num(Number(0))).toBe(0);
      expect(num(Number(1))).toBe(1);
      expect(num(Number(5))).toBe(5);
      expect(num(5.5)).toBe(5.5);
      expect(num(0xff)).toBe(255);
      expect(num(0b111110111)).toBe(503);
      expect(num(0o767)).toBe(503);
    });

    it('should return the primitive number value of a string representing a number', () => {
      expect(num('0')).toBe(0);
      expect(num('1')).toBe(1);
      expect(num('5')).toBe(5);
      expect(num('5.5')).toBe(5.5);
      expect(num('0xFF')).toBe(255);
      expect(num('0b111110111')).toBe(503);
      expect(num('0o767')).toBe(503);
    });

    it('should return the primitive number value of a boolean', () => {
      expect(num(true)).toBe(1);
      expect(num(false)).toBe(0);
      expect(num(new Boolean(true))).toBe(1);
      expect(num(new Boolean(false))).toBe(0);
      expect(num(Boolean(1))).toBe(1);
      expect(num(Boolean(0))).toBe(0);
    });

    it('should return undefined when casting an infinite number', () => {
      expect(num(Number.POSITIVE_INFINITY)).toBeUndefined();
      expect(num(Number.NEGATIVE_INFINITY)).toBeUndefined();
      expect(num('Infinity')).toBeUndefined();
      expect(num('-Infinity')).toBeUndefined();
    });

    it('should return undefined when casting a symbol', () => {
      expect(num(Symbol('s'))).toBeUndefined();
    });

    it('should return undefined when casting a function', () => {
      expect(num(function f() {})).toBeUndefined();
    });

    it('should return undefined when casting a class', () => {
      expect(num(class c {})).toBeUndefined();
    });

    it('should return undefined when casting an error', () => {
      expect(num(new Error('error'))).toBeUndefined();
    });

    it('should return undefined when casting an array', () => {
      expect(num([])).toBeUndefined();
      expect(num([1, 2, 3])).toBeUndefined();
      expect(
        num([
          [1, 2],
          [3, 4, 5],
        ]),
      ).toBeUndefined();
      expect(num(Array(5))).toBeUndefined();
      expect(num(new Array(1, 2, 3))).toBeUndefined();
    });

    it('should return undefined when casting an object', () => {
      expect(num({})).toBeUndefined();
      expect(num({ x: 5 })).toBeUndefined();
      // @ts-expect-error testing purposes
      expect(num(new (function () {})())).toBeUndefined();
    });

    it('should return undefined when casting a map', () => {
      expect(num(new Map())).toBeUndefined();
    });

    it('should return undefined when casting a set', () => {
      expect(num(new Set())).toBeUndefined();
    });

    it('should return undefined when casting a weakmap', () => {
      expect(num(new WeakMap())).toBeUndefined();
    });

    it('should return undefined when casting a weakset', () => {
      expect(num(new WeakSet())).toBeUndefined();
    });

    it('should return undefined when casting undefined', () => {
      expect(num(undefined)).toBeUndefined();
    });

    it('should return undefined when casting null', () => {
      expect(num(null)).toBeUndefined();
    });

    it('should return undefined when casting NaN', () => {
      expect(num(Number.NaN)).toBeUndefined();
    });

    it('should return the specified number value when casting a number that is in the specified range', () => {
      expect(num(5, { ge: 4, le: 9 })).toBe(5);
      expect(num(5, { ge: 0 })).toBe(5);
      expect(num(5, { le: 100 })).toBe(5);
      expect(num(5, { le: 5 })).toBe(5);
      expect(num(5, { ge: 5 })).toBe(5);

      expect(num('5', { ge: 4, le: 9 })).toBe(5);
      expect(num('5', { ge: 0 })).toBe(5);
      expect(num('5', { le: 100 })).toBe(5);
      expect(num('5', { le: 5 })).toBe(5);
      expect(num('5', { ge: 5 })).toBe(5);
    });

    it('should return undefined when casting a number that is out of the specified range', () => {
      expect(num(5, { ge: 6, le: 9 })).toBeUndefined();
      expect(num(5, { ge: 6 })).toBeUndefined();
      expect(num(5, { le: 4 })).toBeUndefined();

      expect(num('5', { ge: 6, le: 9 })).toBeUndefined();
      expect(num('5', { ge: 6 })).toBeUndefined();
      expect(num('5', { le: 4 })).toBeUndefined();
    });

    it('should return undefined when casting a number whose specified range is not valid', () => {
      expect(num(5, { ge: 4, le: 2 })).toBeUndefined();
    });
  });
});
