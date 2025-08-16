import { ApiProperty } from "@nestjs/swagger";

export class FindHistoryControllerOutputDTO {
    @ApiProperty({
        description: 'Lista do histórico',
        example: [
            {
                id: 1,
                idEntry: 5,
                word: 'hello',
                createdAt: '2024-01-01T00:00:00.000Z',
            },
        ],
    })
    results: {
        id: number;
        idEntry: number;
        word: string;
        createdAt: Date;
    }[];
}
