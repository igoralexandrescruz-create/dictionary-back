import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupControllerInputDTO {
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email do usuário',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

}

export class SignupControllerOutputDTO {
    @ApiProperty({
        description: 'ID do usuário',
        example: '123456',
    })
    id: string;

    @ApiProperty({
        description: 'Nome do usuário',
        example: 'John Doe',
    })
    name: string;

    @ApiProperty({
        description: 'Token de autenticação',
        example: '123456',
    })
    token: string;
}