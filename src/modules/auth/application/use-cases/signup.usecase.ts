import { SignupInput, SignupOutput } from "src/modules/auth/application/dto/signup.dto";
import { UserRepositoryPort } from "src/modules/users/domain/ports/user.repository.port";
import { USER_PORT_TOKENS } from "src/modules/users/domain/ports/tokens";
import { SHARED_PORT_TOKENS } from "src/modules/_shared/application/ports/tokens";
import { JwtPort } from "src/modules/_shared/application/ports/jwt.port";
import { Usecase } from "src/modules/_shared/application/usecase.generic";
import { HashPort } from "src/modules/_shared/application/ports/hash.port";
import { AuthenticatedUser } from "src/modules/_shared/application/contracts/authenticated-user.contract";
import { env } from "src/config/env";
import { Inject } from "@nestjs/common";
import { User } from "src/modules/users/domain/entities";
import { Email } from "src/modules/users/domain/value-objects/email";
import { IdPublic } from "src/modules/_shared/domain/value-objects/id-public";
import { GenerateIdPort } from "src/modules/_shared/application/ports/generate-id.port";

export class SignupUsecase extends Usecase<SignupInput, SignupOutput> {
    constructor(
        @Inject(USER_PORT_TOKENS.USER_REPOSITORY)
        private readonly userRepository: UserRepositoryPort,
        @Inject(SHARED_PORT_TOKENS.JWT)
        private readonly jwt: JwtPort,
        @Inject(SHARED_PORT_TOKENS.HASH)
        private readonly hash: HashPort,
        @Inject(SHARED_PORT_TOKENS.GENERATE_ID)
        private readonly generateId: GenerateIdPort,
    ) {
        super('SigninUsecase', 'V1');
    }

    async handleUsecase(input: SignupInput): Promise<Usecase.Response<SignupOutput>> {
        const user = await this.userRepository.findByEmail(input.email);
        if (user) {
            return {
                data: null,
                error: 'Usuário já cadastrado',
            }
        }

        const { idPublic, error: errorIdPublic } = IdPublic.create(this.generateId.execute());
        if (errorIdPublic) {
            return {
                data: null,
                error: errorIdPublic,
            }
        }
        const { email, error: errorEmail } = Email.create(input.email);
        if (errorEmail) {
            return {
                data: null,
                error: errorEmail,
            }
        }

        const password = await this.hash.hash(input.password);
        const userCreated = User.create({
            idPublic,
            name: input.name,
            email,
            password,
        });
        const userSaved = await this.userRepository.save(userCreated);

        const token = this.jwt.sign<AuthenticatedUser>({
            id: userSaved.id,
            idPublic: userSaved.idPublic,
            name: userSaved.name,
            email: userSaved.email,
            loggedAt: new Date(),
        }, env.security.jwt.jwtExpiresIn);

        return {
            data: {
                token,
                user: {
                    id: userSaved.idPublic,
                    name: userSaved.name,
                },
            },
            error: null,
        }
    }
}