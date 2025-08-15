import { SigninUsecase } from "../signin.usecase";
import { UserRepositoryPort } from "src/modules/users/domain/ports/user.repository.port";
import { JwtPort } from "src/modules/_shared/application/ports/jwt.port";
import { HashPort } from "src/modules/_shared/application/ports/hash.port";
import { mock, MockProxy } from "jest-mock-extended"
import { Test, TestingModule } from "@nestjs/testing";
import { USER_PORT_TOKENS } from "src/modules/users/domain/ports/tokens";
import { SHARED_PORT_TOKENS } from "src/modules/_shared/application/ports/tokens";
import { LogPort } from "src/modules/_shared/application/ports/log-port";
import { LogBenchmarkPort } from "src/modules/_shared/application/ports/log-benchmark.port";
import { mockUser } from "test/mock/user.mock";
import { AuthenticatedUser } from "src/modules/_shared/application/contracts/authenticated-user.contract";
import { env } from "src/config/env";
import { LoginLogRepositoryPort } from "src/modules/auth/domain/ports";
import { AUTH_PORT_TOKENS } from "src/modules/auth/domain/ports/tokens";
import { SigninOutput } from "../../dto/signin.dto";

describe('SigninUsecase', () => {
    let signinUsecase: SigninUsecase;
    let userRepository: MockProxy<UserRepositoryPort>;
    let jwt: MockProxy<JwtPort>;
    let hash: MockProxy<HashPort>;
    let log: MockProxy<LogPort>;
    let logBenchmark: MockProxy<LogBenchmarkPort>;
    let loginLogRepository: MockProxy<LoginLogRepositoryPort>;
    const user = mockUser();

    beforeAll(async () => {
        userRepository = mock<UserRepositoryPort>();
        jwt = mock();
        hash = mock();
        log = mock();
        logBenchmark = mock();
        loginLogRepository = mock();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SigninUsecase,
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
                    provide: AUTH_PORT_TOKENS.LOGIN_LOG_REPOSITORY,
                    useValue: loginLogRepository,
                },
            ],
        }).compile();

        signinUsecase = module.get(SigninUsecase)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call the user repository with the correct email', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(user);
        await signinUsecase.execute({ email: user.email, password: '123456' });
        expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);

    });

    it('should return an error if the user is not found', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(null);
        const result = await signinUsecase.execute({ email: 'test@test.com', password: '123456' });
        expect(result.error).toBe('Usuário não encontrado');
    });

    it('should call the hash with the correct password', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(user);
        const password = '123456';
        await signinUsecase.execute({ email: user.email, password });
        expect(hash.compare).toHaveBeenCalledWith(password, user.password);
        expect(hash.compare).toHaveBeenCalledTimes(1);

    });

    it('should call the jwt with the correct user', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(user);
        hash.compare.mockResolvedValueOnce(true);

        const { data } = await signinUsecase.execute({ email: user.email, password: '123456' });
        const params: AuthenticatedUser = {
            id: user.id,
            idPublic: user.idPublic,
            name: user.name,
            email: user.email,
            loggedAt: data?.loggedAt,
        }
        expect(jwt.sign).toHaveBeenCalledWith(params, env.security.jwt.jwtExpiresIn);
        expect(jwt.sign).toHaveBeenCalledTimes(1);

    });

    it('should return an error if the password is incorrect', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(user);
        hash.compare.mockResolvedValueOnce(false);

        const result = await signinUsecase.execute({ email: 'test@test.com', password: '123456' });
        expect(result.error).toBe('Senha inválida');
    });

    it('should call the login log repository with the correct user', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(user);
        hash.compare.mockResolvedValueOnce(true);
        await signinUsecase.execute({ email: user.email, password: '123456' });
        expect(loginLogRepository.save).toHaveBeenCalledWith(user.id);
        expect(loginLogRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return the correct data', async () => {
        const token = 'any_token';
        userRepository.findByEmail.mockResolvedValueOnce(user);
        hash.compare.mockResolvedValueOnce(true);
        jwt.sign.mockReturnValueOnce(token as never);

        const result = await signinUsecase.execute({ email: user.email, password: '123456' });
        const response: SigninOutput = {
            token,
            user: {
                id: user.idPublic,
                name: user.name,
            },
            loggedAt: result.data?.loggedAt,
        }
        expect(result.data).toEqual(response);
        expect(result.error).toBeNull();
    });
});
