import { DynamicModule, Global, Module } from "@nestjs/common";
import { LogBenchmarkAdapter } from "./log-benchmark.adapter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogBenchmarkOrm, LogServiceOrm } from "../../entities";
import { LogModule } from "../log/log.module";
import { SHARED_PORT_TOKENS } from "src/modules/_shared/application/ports/tokens";
import { LogAdapter } from "../log/log.adapter";

@Global()
@Module({})
export class LogBenchmarkModule {
    static register(): DynamicModule {
        const provider = {
            provide: SHARED_PORT_TOKENS.LOG_BENCHMARK,
            useFactory: (log: LogBenchmarkAdapter) => {
                return log;
            },
            inject: [LogBenchmarkAdapter],
        };

        return {
            module: LogBenchmarkModule,
            imports: [
                TypeOrmModule.forFeature([
                    LogBenchmarkOrm,
                    LogServiceOrm,
                ]),
                LogModule,
            ],
            providers: [provider, LogBenchmarkAdapter],
            exports: [provider],
        };
    }
}
