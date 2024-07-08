import { describe, expect, it } from 'bun:test';
import { type ElementNode, parse } from 'svg-parser';
import Sparkline from './Sparkline';

const values = [10, 50, 50, 200, 0];

describe('#Sparkline index', () => {
  it('should create a new Sparkline object with the specified options and calculate expected points', () => {
    const sparkline = new Sparkline({
      values,
      width: 200,
      height: 50,
      stroke: 'blue',
      strokeWidth: 1.25,
      strokeOpacity: 1,
    });

    expect(sparkline.constructor).toBe(Sparkline);
    expect(sparkline.values).toBeArray();
    expect(sparkline.values).toStrictEqual(values);
    expect(sparkline.width).toBe(200);
    expect(sparkline.height).toBe(50);
    expect(sparkline.stroke).toBe('blue');
    expect(sparkline.strokeWidth).toBe(1.25);
    expect(sparkline.strokeOpacity).toBe(1);

    expect(sparkline.points).toBeArray();
    expect(sparkline.points).toHaveLength(values.length + 1);
    expect(sparkline.points).toStrictEqual(['0', '47.5 40', '37.5 80', '37.5 120', '0 160', '50 200']);
  });

  it('should generate a valid SVG string', () => {
    const sparkline = new Sparkline({
      values,
      width: 200,
      height: 50,
      stroke: 'blue',
      strokeWidth: 1.25,
      strokeOpacity: 1,
    });
    const svg = sparkline.generate();
    const parsed = parse(svg);
    expect(svg).toBeString();
    expect(parsed.children).toBeArray();
    expect(parsed.children).toHaveLength(1);

    // svg root
    const [root] = parsed.children as [ElementNode];
    expect(root.tagName).toBe('svg');
    expect(root.properties?.xmlns).toBe('http://www.w3.org/2000/svg');
    expect(root.properties?.width).toBe(sparkline.width);
    expect(root.properties?.height).toBe(sparkline.height);
    expect(root.properties?.viewBox).toBe(`0 0 ${sparkline.width} ${sparkline.height}`);
    expect(root.properties?.['shape-rendering']).toBe('auto');
    expect(root.children).toBeArray();
    expect(root.children).toHaveLength(1);

    // polyline
    const [polyline] = root.children as [ElementNode];
    expect(polyline.tagName).toBe('polyline');
    expect(polyline.properties?.points).toBe(sparkline.points.join(', '));
    expect(polyline.properties?.stroke).toBe(sparkline.stroke as string);
    expect(polyline.properties?.['stroke-width']).toBe(sparkline.strokeWidth as number);
    expect(polyline.properties?.['stroke-opacity']).toBe(sparkline.strokeOpacity as number);
    expect(polyline.properties?.fill).toBe('none');
    expect(polyline.properties?.['fill-opacity']).toBe(0);
  });
});
