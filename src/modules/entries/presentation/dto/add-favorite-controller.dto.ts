import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddFavoriteControllerInputDTO {
    @ApiProperty({
        description: 'Palavra a ser favoritada',
        example: 'hello',
    })
    @IsString()
    word: string;
}

export class AddFavoriteControllerOutputDTO {
    @ApiProperty({
        description: 'Status da operação',
        example: true,
    })
    success: boolean;
}
