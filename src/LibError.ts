import LibErrorCodes from './LibErrorCodes';

type Code = keyof typeof LibErrorCodes;

interface LibErrorOptions {
  code?: keyof typeof LibErrorCodes;
  message?: string;
  name?: string;
}

export default class LibError extends Error {
  static Codes = LibErrorCodes;
  code: Code | undefined;

  constructor({ code, message, name }: LibErrorOptions = {}, originError = '') {
    super();
    this.setCode(code);
    this.setMessage(message);
    this.setName(name);
    this.setStack(originError);
  }

  setCode(value: unknown) {
    if (typeof value !== 'string' || !Object.keys(LibErrorCodes).includes(value)) {
      throw new Error(`Invalid error code '${value}'`);
    }
    this.code = value as Code;
  }

  setMessage(value: unknown) {
    if (typeof value === 'string') {
      this.message = value;
    } else if (this.code !== undefined) {
      this.message = LibErrorCodes[this.code].message;
    } else {
      throw new Error('Cannot set message without a code');
    }
  }

  setName(value: unknown) {
    if (typeof value === 'string') {
      this.name = value;
    } else if (this.code !== undefined) {
      this.name = LibErrorCodes[this.code].name;
    }
  }

  setStack(originError: unknown) {
    if (originError instanceof Error) {
      this.stack = originError.stack;
    }

    if (
      typeof originError === 'object' &&
      originError !== null &&
      'stack' in originError &&
      typeof originError.stack === 'string'
    ) {
      this.stack = originError.stack;
    }
  }

  toString() {
    let libErrorStr = `${this.name} (${this.code})`;

    if (typeof this.message === 'string' && this.message.trim() !== '') {
      libErrorStr += `: ${this.message}`;
    }

    return libErrorStr;
  }
}
