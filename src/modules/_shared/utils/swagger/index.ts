import { ApiResponseOptions } from '@nestjs/swagger';

export const ApiUnauthorized: ApiResponseOptions = {
  description: 'Não autorizado',
  example: {
    message: 'Unauthorized',
    statusCode: 401,
  },
};

export const ApiForbidden: ApiResponseOptions = {
  description: 'Acesso negado',
  example: {
    message: 'Forbidden',
    statusCode: 403,
  },
};