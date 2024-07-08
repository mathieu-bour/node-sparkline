import { describe, expect, it } from 'bun:test';
import { type ElementNode, parse } from 'svg-parser';
import LibError from './LibError.js';
import createSparkline from './createSparkline.js';
import defaults from './settings/defaults.js';

const values = [10, 50, 50, 200, 0];

describe('#lib index', () => {
  it('should throw an error when creating a sparkline with no values', () => {
    // @ts-expect-error testing error
    expect(() => createSparkline()).toThrowError(LibError);
    // @ts-expect-error testing error
    expect(() => createSparkline({ width: 100 })).toThrowError(LibError);
    // @ts-expect-error testing error
    expect(() => createSparkline({ height: 100 })).toThrowError('missing values to draw the sparkline');
  });

  it('should throw an error when creating a sparkline wrong values', () => {
    // @ts-expect-error testing error
    expect(() => createSparkline({ values: true })).toThrowError(LibError);
    // @ts-expect-error testing error
    expect(() => createSparkline({ values: 15 })).toThrowError(LibError);
    // @ts-expect-error testing error
    expect(() => createSparkline({ values: '100,200,55,5,25' })).toThrowError(LibError);
  });

  it('should return a SVG string with default settings if only values were specified', () => {
    const svg = createSparkline({ values });
    const parsed = parse(svg);
    expect(svg).toBeString();
    expect(parsed.children).toBeArray();
    expect(parsed.children).toHaveLength(1);

    // svg root
    const [root] = parsed.children as [ElementNode];
    expect(root.tagName).toBe('svg');
    expect(root.properties?.xmlns).toBe('http://www.w3.org/2000/svg');
    expect(root.properties?.width).toBe(defaults.width);
    expect(root.properties?.height).toBe(defaults.height);
    expect(root.properties?.viewBox).toBe(`0 0 ${defaults.width} ${defaults.height}`);
    expect(root.properties?.['shape-rendering']).toBe('auto');
    expect(root.children).toBeArray();
    expect(root.children).toHaveLength(1);

    // polyline
    const [polyline] = root.children as [ElementNode];
    expect(polyline.tagName).toBe('polyline');
    expect(polyline.properties?.stroke).toBe(defaults.stroke);
    expect(polyline.properties?.['stroke-width']).toBe(defaults.strokeWidth);
    expect(polyline.properties?.['stroke-opacity']).toBe(defaults.strokeOpacity);
    expect(polyline.properties?.fill).toBe('none');
    expect(polyline.properties?.['fill-opacity']).toBe(0);
  });

  it('should return a SVG string with specified settings provided', () => {
    const options = {
      values,
      width: 250,
      height: 100,
      stroke: 'blue',
      strokeWidth: 2,
      strokeOpacity: 0.5,
    };

    const svg = createSparkline(options);
    const parsed = parse(svg);
    expect(svg).toBeString();
    expect(parsed.children).toBeArray();
    expect(parsed.children).toHaveLength(1);

    // svg root
    const [root] = parsed.children as [ElementNode];
    expect(root.tagName).toBe('svg');
    expect(root.properties?.xmlns).toBe('http://www.w3.org/2000/svg');
    expect(root.properties?.width).toBe(options.width);
    expect(root.properties?.height).toBe(options.height);
    expect(root.properties?.viewBox).toBe(`0 0 ${options.width} ${options.height}`);
    expect(root.properties?.['shape-rendering']).toBe('auto');
    expect(root.children).toBeArray();
    expect(root.children).toHaveLength(1);

    // polyline
    const [polyline] = root.children as [ElementNode];
    expect(polyline.tagName).toBe('polyline');
    expect(polyline.properties?.stroke).toBe(options.stroke);
    expect(polyline.properties?.['stroke-width']).toBe(options.strokeWidth);
    expect(polyline.properties?.['stroke-opacity']).toBe(options.strokeOpacity);
    expect(polyline.properties?.fill).toBe('none');
    expect(polyline.properties?.['fill-opacity']).toBe(0);
  });
});
