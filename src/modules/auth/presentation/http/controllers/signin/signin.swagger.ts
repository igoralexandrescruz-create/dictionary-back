import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export namespace SigninSwagger {
    export const ApiSigninDescription: ApiOperationOptions = {
        description: 'Endpoint para gerar token de acesso à API',
        summary: 'Realiza login na API',
    };
    export const ApiSigninOK: ApiResponseOptions = {
        description: 'Login realizado com sucesso',
        example: {
            statusCode: 200,
            data: {
                id: "01JZNAFJ53H0XSM5WKDGHDE4C1",
                name: "User Name",
                token: "JWT_TOKEN",
            }
        }
    };
    export const ApiSigninUnauthorized: ApiResponseOptions = {
        description: 'Login não autorizado',
        example: {
            message: "Login ou senha inválidos",
            error: "Unauthorized",
            statusCode: 401
        },
    };
    export const ApiSigninBadRequest: ApiResponseOptions = {
        description: 'Requisição inválida',
        example: {
            message: [
                "email must be an email",
                "password should not be empty"
            ],
            error: "Bad Request",
            statusCode: 400
        },
    };
}
