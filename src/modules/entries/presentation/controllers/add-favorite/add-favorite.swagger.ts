import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export namespace AddFavoriteSwagger {
    export const ApiAddFavoriteDescription: ApiOperationOptions = {
        description: 'Endpoint para adicionar palavra aos favoritos',
        summary: 'Adicionar favorito',
    };
    export const ApiAddFavoriteOK: ApiResponseOptions = {
        description: 'Favorito adicionado com sucesso',
        example: {
            statusCode: 201,
            data: {
                success: true,
            }
        }
    };
    export const ApiAddFavoriteBadRequest: ApiResponseOptions = {
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
