import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class FindEntriesControllerInputDTO {
    @ApiProperty({
        description: 'Limite de resultados',
        example: 10,
    })
    @IsNumber()
    @Min(1)
    @Max(100)
    limit: number;

    @ApiProperty({
        description: 'ID do último resultado',
        example: 1,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    lastId?: number;

    @ApiProperty({
        description: 'Busca por palavra',
        example: 'teste',
        required: false,
    })
    @IsString()
    @IsOptional()
    search?: string;
}

export class FindEntriesControllerOutputDTO {
    @ApiProperty({
        description: 'Resultados',
        example: [
            {
                id: 1,
                word: 'teste',
            },
        ],
    })
    results: string[];

    @ApiProperty({
        description: 'Total de resultados',
        example: 1,
    })
    totalDocs: number;

    @ApiProperty({
        description: 'Página anterior',
        example: 1,
    })
    previous: number;

    @ApiProperty({
        description: 'Próxima página',
        example: 1,
    })
    next: number;

    @ApiProperty({
        description: 'Tem mais resultados',
        example: true,
    })
    hasNext: boolean;

    @ApiProperty({
        description: 'Tem resultados anteriores',
        example: false,
    })
    hasPrevious: boolean;
}