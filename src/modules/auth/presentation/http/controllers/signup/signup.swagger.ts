import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export namespace SignupSwagger {
    export const ApiSignupDescription: ApiOperationOptions = {
        description: 'Endpoint para criar uma conta na API',
        summary: 'Cria uma conta na API',
    };
    export const ApiSignupOK: ApiResponseOptions = {
        description: 'Conta criada com sucesso',
        example: {
            statusCode: 200,
            data: {
                id: "01JZNAFJ53H0XSM5WKDGHDE4C1",
                name: "User Name",
                token: "JWT_TOKEN",
            }
        }
    };

    export const ApiSignupBadRequest: ApiResponseOptions = {
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
