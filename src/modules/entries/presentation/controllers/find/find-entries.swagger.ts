import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export namespace FindEntriesSwagger {
    export const ApiFindEntriesDescription: ApiOperationOptions = {
        description: 'Endpoint para buscar palavras',
        summary: 'Buscar palavras',
    };
    export const ApiFindEntriesOK: ApiResponseOptions = {
        description: 'Busca realizada com sucesso',
        example: {
            statusCode: 200,
            data: {
                results: ['hello', 'world'],
                totalDocs: 2,
                previous: 0,
                next: 0,
                hasNext: false,
                hasPrevious: false,
            }
        }
    };
    export const ApiFindEntriesBadRequest: ApiResponseOptions = {
        description: 'Requisição inválida',
        example: {
            message: [
                "limit must be a number",
                "lastId must be a number",
            ],
            error: "Bad Request",
            statusCode: 400
        },
    };

}
