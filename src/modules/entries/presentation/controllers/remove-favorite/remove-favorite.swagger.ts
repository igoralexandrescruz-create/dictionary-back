import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export namespace RemoveFavoriteSwagger {
    export const ApiRemoveFavoriteDescription: ApiOperationOptions = {
        description: 'Endpoint para remover palavra dos favoritos',
        summary: 'Remover favorito',
    };
    export const ApiRemoveFavoriteOK: ApiResponseOptions = {
        description: 'Favorito removido com sucesso',
        example: {
            statusCode: 200,
            data: {
                success: true,
            }
        }
    };
    export const ApiRemoveFavoriteBadRequest: ApiResponseOptions = {
        description: 'Requisição inválida',
        example: {
            message: [
                "idEntry must be a number",
            ],
            error: "Bad Request",
            statusCode: 400
        },
    };
}
