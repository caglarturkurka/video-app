import { InternalServerException } from '../exception/internal-server.exception';

export class Util {
  public static throwError(e) {
    if (e.status) {
      throw e;
    } else {
      throw new InternalServerException(e.message);
    }
  }
}
