/**
 * Type casting library utility.
 *
 *    - num(thing, { le, ge } = {}) -> Number or undefined
 */

/**
 * @func number
 *
 * cast to primitive number if possible or returns undefined
 * because Number(null) returns 0 and Number(undefined|NaN) returns NaN
 * beware to call Number.isFinite only on number values
 * NOTE: only finite values
 *
 * @param  {Any} thing a value to cast to primitive number
 * @return {Number|undefined}
 */
export function number(thing: unknown): number | undefined {
  if (typeof thing === 'number' && Number.isFinite(thing)) {
    return thing;
  }

  if (typeof thing === 'string') {
    const cast = Number(thing);
    if (Number.isFinite(cast)) {
      return cast;
    }
  }

  if (typeof thing === 'boolean' || thing instanceof Boolean || thing instanceof Number) {
    return Number(thing);
  }

  return undefined;
}

/**
 * @func num
 *
 * cast to primitive number, with 'less or equal than'
 * or 'greater or equal than' options, or returns undefined
 * NOTE: based on "number" function
 *
 * @param  {Any} thing a value to cast to primitive number
 * @return {Number|undefined}
 */
export function num(thing: unknown, { ge, le }: { ge?: number; le?: number } = {}) {
  let castNum = number(thing);

  if (castNum !== undefined) {
    const lessThan = number(le);
    const greaterThan = number(ge);

    if (lessThan !== undefined && greaterThan !== undefined) {
      if (castNum < greaterThan || castNum > lessThan) {
        castNum = undefined;
      }
    } else if (lessThan !== undefined && castNum > lessThan) {
      castNum = undefined;
    } else if (greaterThan !== undefined && castNum < greaterThan) {
      castNum = undefined;
    }
  }

  return castNum;
}
