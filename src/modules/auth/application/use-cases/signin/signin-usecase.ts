import { SigninInput, SigninOutput } from "src/modules/auth/application/dto/login-dto";
import { UserRepositoryPort } from "src/modules/users/domain/ports/user.repository.port";
import { USER_PORT_TOKENS } from "src/modules/users/domain/ports/tokens";
import { SHARED_PORT_TOKENS } from "src/modules/_shared/application/ports/tokens";
import { JwtPort } from "src/modules/_shared/application/ports/jwt.port";
import { Usecase } from "src/modules/_shared/application/usecase.generic";
import { HashPort } from "src/modules/_shared/application/ports/hash.port";
import { AuthenticatedUser } from "src/modules/_shared/application/contracts/authenticated-user.contract";
import { env } from "src/config/env";
import { Inject } from "@nestjs/common";

export class SigninUsecase extends Usecase<SigninInput, SigninOutput> {
    constructor(
        @Inject(USER_PORT_TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepositoryPort,
        @Inject(SHARED_PORT_TOKENS.JWT)
        private readonly jwt: JwtPort,
        @Inject(SHARED_PORT_TOKENS.HASH)
        private readonly hash: HashPort,
    ) {
        super('SigninUsecase', 'V1');
    }

    async handleUsecase(input: SigninInput): Promise<Usecase.Response<SigninOutput>> {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            return {
                data: null,
                error: 'Usuário não encontrado',
            }
        }

        const isPasswordValid = await this.hash.compare(input.password, user.password);
        if (!isPasswordValid) {
            return {
                data: null,
                error: 'Senha inválida',
            }
        }

        const token = this.jwt.sign<AuthenticatedUser>({
            id: user.id,
            idPublic: user.idPublic,
            name: user.name,
            email: user.email,
            loggedAt: new Date(),
        }, env.security.jwt.jwtExpiresIn);

        return {
            data: {
                token,
                expiresIn: 1000,
                user: {
                    id: user.idPublic,
                    name: user.name,
                },
            },
            error: null,
        }
    }
}