class HttpException {
  public readonly code;
  public readonly message;

  constructor(message: string, code = 400) {
    this.code = code;
    this.message = message;
  }
}

export { HttpException };
