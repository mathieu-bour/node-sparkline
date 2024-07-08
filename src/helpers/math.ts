/**
 * @func minmax
 *
 * directly get min and max values in a specific array, works with numbers and strings
 * NOTE: for performance use.
 *
 * @param  {Array} array
 * @return {Object} { min, max }
 */
export function minmax<T extends string | number>(array: T[]): { min: T | undefined; max: T | undefined } {
  if (!Array.isArray(array) || array.length === 0) {
    return { min: undefined, max: undefined };
  }

  let min: T | undefined;
  let max: T | undefined;

  for (const value of array) {
    if (max === undefined) {
      max = value;
    } else if (max !== null && value > max) {
      max = value;
    }

    if (min === undefined) {
      min = value;
    } else if (min !== null && value < min) {
      min = value;
    }
  }

  return { min, max };
}
