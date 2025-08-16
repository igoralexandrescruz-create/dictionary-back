import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RemoveFavoriteControllerInputDTO {
    @ApiProperty({
        description: 'Palavra a ser removida dos favoritos',
        example: 'palavra',
    })
    @IsString()
    word: string;
}

export class RemoveFavoriteControllerOutputDTO {
    @ApiProperty({
        description: 'Status da operação',
        example: true,
    })
    success: boolean;
}
