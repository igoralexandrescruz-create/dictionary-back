import { HttpException, Inject, InternalServerErrorException } from "@nestjs/common";
import { DataSource, QueryRunner } from "typeorm";
import { LogPort } from "./ports/log-port";
import { SHARED_PORT_TOKENS } from "./ports/tokens";
import { LogBenchmarkPort } from "./ports/log-benchmark.port";
import { Log } from "./contracts/log.contract";

export abstract class Usecase<P = any, R = any> {

    @Inject(SHARED_PORT_TOKENS.LOG)
    protected readonly log: LogPort;
    @Inject(SHARED_PORT_TOKENS.LOG_BENCHMARK)
    protected readonly logBenchmark: LogBenchmarkPort;

    constructor(
        protected readonly logContext: string,
        protected readonly version: string,
        protected readonly dataSource?: DataSource,
    ) { }

    public async execute(params: P): Promise<Usecase.Response<R>> {
        const start = performance.now();
        let queryRunner: QueryRunner;
        try {
            if (this.dataSource) {
                queryRunner = await this.startTransaction(this.dataSource);
            }
            const result = await this.handleUsecase(params, queryRunner);
            if (queryRunner && !queryRunner.isReleased) {
                await queryRunner.commitTransaction();
            }
            this.logBenchmark.handleBenchmark(start, `${this.logContext}_${this.version}`);
            return result;
        } catch (error) {
            if (queryRunner && !queryRunner.isReleased) {
                await queryRunner.rollbackTransaction();
            }
            if (error instanceof HttpException) {
                throw error;
            }
            this.saveServiceLog({
                message: error.message,
                type: Log.Types.FATAL,
            });
            throw new InternalServerErrorException('Erro ao executar serviço');
        }
        finally {
            if (queryRunner && !queryRunner.isReleased) {
                await queryRunner.release();
            }
        }
    }

    protected async startTransaction(dataSource: DataSource): Promise<QueryRunner> {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;
    }

    protected async saveServiceLog({ message, type, params }: LogParams) {
        const messageWithParams = params ? `${message} | ${JSON.stringify(params)}` : message;
        this.log.log({
            message: messageWithParams,
            type,
            context: `${this.logContext}_${this.version}`,
        });
    }

    abstract handleUsecase(params: P, queryRunner?: QueryRunner): Promise<Usecase.Response<R>>;
}

type LogParams = {
    message: string;
    type: Log.Types;
    params?: Record<string, any>;
}

export namespace Usecase {
    export type Response<T> = {
        data: T;
        error: string | null;
    }
}