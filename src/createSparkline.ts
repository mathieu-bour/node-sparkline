import { debug as createDebug } from 'debug';
import LibError from './LibError';
import LibErrorCodes from './LibErrorCodes';
import type { SparklineSettings } from './Sparkline';
import Sparkline from './Sparkline';
import { num } from './helpers/cast';
import { isColor } from './helpers/color';
import defaults from './settings/defaults';

const debug = createDebug('node-sparkline');

export interface CreateSparklineOptions {
  values: number[];
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

/**
 * @func sparkline
 *
 * Generate a SVG drawing a sparkline based on specific values.
 *
 * @param  {Array} values            an array of values to draw the sparkline
 * @param  {Number} width            the width in pixels to fix for the generated SVG
 * @param  {Number} height           the height in pixels to fix for the generated SVG
 * @param  {String} stroke           the stroke color
 * @param  {Number} strokeWidth      the stroke width in pixels
 * @param  {Number} strokeOpacity    the stroke opacity
 * @return {String} SVG content
 */
export default function createSparkline(
  { values, width, height, stroke, strokeWidth, strokeOpacity }: CreateSparklineOptions = {
    values: [],
  },
) {
  if (!Array.isArray(values)) {
    throw new LibError(LibErrorCodes.MISSING_VALUES);
  }

  if (values.length === 0) {
    throw new LibError(LibErrorCodes.INVALID_VALUES);
  }

  /**
   * ensure user settings match default settings types and have correct values
   * or keep default values
   */
  const settings: SparklineSettings = {
    values,
    width: num(width, { ge: 10 }) || defaults.width,
    height: num(height, { ge: 10 }) || defaults.height,
    stroke: isColor(stroke) ? stroke : defaults.stroke,
    strokeWidth: num(strokeWidth, { ge: 0 }) || defaults.strokeWidth,
    strokeOpacity: num(strokeOpacity, { ge: 0, le: 1 }) || defaults.strokeOpacity,
  };

  debug('settings:');
  debug(settings);

  // create a new Sparkline and generate SVG
  const svg = new Sparkline(settings).generate();

  debug('generated:');
  debug(svg);

  return svg;
}
