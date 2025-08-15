import { mock, MockProxy } from "jest-mock-extended";
import { SignupUsecase } from "../signup.usecase";
import { UserRepositoryPort } from "src/modules/users/domain/ports/user.repository.port";
import { HashPort } from "src/modules/_shared/application/ports/hash.port";
import { JwtPort } from "src/modules/_shared/application/ports/jwt.port";
import { Test, TestingModule } from "@nestjs/testing";
import { USER_PORT_TOKENS } from "src/modules/users/domain/ports/tokens";
import { SHARED_PORT_TOKENS } from "src/modules/_shared/application/ports/tokens";
import { LogPort } from "src/modules/_shared/application/ports/log-port";
import { LogBenchmarkPort } from "src/modules/_shared/application/ports/log-benchmark.port";
import { GenerateIdPort } from "src/modules/_shared/application/ports/generate-id.port";
import { mockUser } from "test/mock/user.mock";
import { env } from "src/config/env";
import { IdPublic } from "src/modules/_shared/domain/value-objects/id-public";
import { Email } from "src/modules/users/domain/value-objects/email";
import { User } from "src/modules/users/domain/entities";
import { AuthenticatedUser } from "src/modules/_shared/application/contracts/authenticated-user.contract";

describe('SignupUsecase', () => {
    let signupUsecase: SignupUsecase;
    let userRepository: MockProxy<UserRepositoryPort>;
    let hash: MockProxy<HashPort>;
    let jwt: MockProxy<JwtPort>;
    let generateId: MockProxy<GenerateIdPort>;
    let log: MockProxy<LogPort>;
    let logBenchmark: MockProxy<LogBenchmarkPort>;
    const ulid = '01K2QN5003Y7CFE7DY28FRR3DN';
    const user = mockUser({});
    const userSaved = mockUser({ id: 1, idPublic: ulid });

    beforeAll(async () => {
        userRepository = mock();
        hash = mock();
        jwt = mock();
        generateId = mock();
        log = mock();
        logBenchmark = mock();
        userRepository.findByEmail.mockResolvedValue(null);
        userRepository.save.mockResolvedValue(userSaved);
        generateId.execute.mockReturnValue(ulid);
        hash.hash.mockResolvedValue('123456');
        jwt.sign.mockReturnValue('any_token');

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SignupUsecase,
                {
                    provide: USER_PORT_TOKENS.USER_REPOSITORY,
                    useValue: userRepository,
                },
                {
                    provide: SHARED_PORT_TOKENS.JWT,
                    useValue: jwt,
                },
                {
                    provide: SHARED_PORT_TOKENS.HASH,
                    useValue: hash,
                },
                {
                    provide: SHARED_PORT_TOKENS.LOG,
                    useValue: log,
                },
                {
                    provide: SHARED_PORT_TOKENS.LOG_BENCHMARK,
                    useValue: logBenchmark,
                },
                {
                    provide: SHARED_PORT_TOKENS.GENERATE_ID,
                    useValue: generateId,
                },
            ],
        }).compile();

        signupUsecase = module.get(SignupUsecase);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call the user repository with the correct params', async () => {
        await signupUsecase.execute({ email: user.email, password: '123456', name: user.name });
        expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('should return error if user already exists', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(user);
        const result = await signupUsecase.execute({ email: user.email, password: '123456', name: user.name });
        expect(result.error).toBe('Usuário já cadastrado');
    });

    it('should return error if id public is invalid', async () => {
        generateId.execute.mockReturnValueOnce('invalid_id');
        const result = await signupUsecase.execute({ email: user.email, password: '123456', name: user.name });
        expect(result.error).toBe('Erro ao registrar usuário');
    });

    it('should return error if email is invalid', async () => {
        const result = await signupUsecase.execute({ email: 'invalid_email', password: '123456', name: user.name });
        expect(result.error).toBe('Email inválido');
    });

    it('should call the jwt with the correct user', async () => {
        await signupUsecase.execute({ email: user.email, password: '123456', name: user.name });
        const params: Omit<AuthenticatedUser, 'loggedAt'> = {
            id: userSaved.id,
            idPublic: userSaved.idPublic,
            name: userSaved.name,
            email: userSaved.email,
        }

        expect(jwt.sign).toHaveBeenCalledWith(expect.objectContaining(params), env.security.jwt.jwtExpiresIn);
        expect(jwt.sign).toHaveBeenCalledTimes(1);
    });


    it('should call the user repository with the correct user', async () => {
        const password = '123456';
        await signupUsecase.execute({ email: user.email, password, name: user.name });
        const userCreated = User.create({
            idPublic: IdPublic.create(ulid).idPublic,
            email: Email.create(user.email).email,
            password,
            name: user.name,
        });
        expect(userRepository.save).toHaveBeenCalledWith(userCreated);
        expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return the correct data', async () => {
        const result = await signupUsecase.execute({ email: user.email, password: '123456', name: user.name });
        expect(result.data).toEqual({
            token: 'any_token',
            user: {
                id: userSaved.idPublic,
                name: userSaved.name,
            },
        });
    });
});