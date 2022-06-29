// Anderson, O Brabo, Rodrigues me ensinou o básico de classe

class ErrorObject extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorObject;