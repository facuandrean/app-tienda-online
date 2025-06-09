/**
 * Custom error class for application errors.
 * 
 * @param message - The error message.
 * @param statusCode - The HTTP status code.
 */
export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}
