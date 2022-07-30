export class ServerError extends Error {
  constructor(error?: Error) {
    super('Server failed. Try again soon');
    this.name = 'ServerError';
    this.stack = error?.stack;
  }
}

export class NotFound extends Error {
  constructor(error?: Error) {
    super('The server cannot find the requested resource.');
    this.name = 'Not found';
    this.stack = error?.stack;
  }
}
