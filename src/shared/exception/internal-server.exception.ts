import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerException extends HttpException {
  constructor(message) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
