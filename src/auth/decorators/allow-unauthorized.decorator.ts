import { SetMetadata } from '@nestjs/common';
import { ALLOW_UNAUTHORIZED } from '../constant/allow-unauthorized.constants';

export const AllowUnauthorized = () => {
  return SetMetadata(ALLOW_UNAUTHORIZED, true);
};
