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

describe('SignupUsecase', () => {
    let signupUsecase: SignupUsecase;
    let userRepository: MockProxy<UserRepositoryPort>;
    let hash: MockProxy<HashPort>;
    let jwt: MockProxy<JwtPort>;
    let generateId: MockProxy<GenerateIdPort>;
    let log: MockProxy<LogPort>;
    let logBenchmark: MockProxy<LogBenchmarkPort>;
    const user = mockUser();

    beforeAll(async () => {
        userRepository = mock();
        hash = mock();
        jwt = mock();
        generateId = mock();
        log = mock();
        logBenchmark = mock();

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

    it('should call the user repository with the correct email', async () => {
        userRepository.findByEmail.mockResolvedValueOnce(user);
        await signupUsecase.execute({ email: user.email, password: '123456', name: user.name });
        expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
        expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);

    });
});