import { Request } from 'express';
import { AuthenticatedUser } from 'src/modules/_shared/application/contracts/authenticated-user.contract';

export interface AppRequest extends Request {
  user: AuthenticatedUser;
}
