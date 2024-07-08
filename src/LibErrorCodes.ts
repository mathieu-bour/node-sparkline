// internal errors
const LibErrorCodes = {
  MISSING_VALUES: {
    code: 'MISSING_VALUES',
    message: 'missing values to draw the sparkline',
    name: 'InputError',
  },
  INVALID_VALUES: {
    code: 'INVALID_VALUES',
    message: 'values must be an array',
    name: 'InputError',
  },
} as const;

export default LibErrorCodes;
