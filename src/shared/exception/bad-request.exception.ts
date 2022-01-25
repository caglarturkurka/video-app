import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
    constructor(message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
