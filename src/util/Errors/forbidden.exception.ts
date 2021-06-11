import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export class VerbottenException extends HttpException {
  constructor(message: string) {
    super('Forbidden', HttpStatus.FORBIDDEN);
    this.message = message;
  }
}
