class Error {
  constructor(httpCode, message, isShowStackTrace) {
    this.httpCode = httpCode;
    this.message = message;
    this.isShowStackTrace = isShowStackTrace;
  }
}

module.exports = Error;
