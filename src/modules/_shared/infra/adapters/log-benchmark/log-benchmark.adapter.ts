import { LogAdapter } from "src/modules/_shared/infra/adapters/log/log.adapter";
import { LogBenchmarkOrm, LogServiceOrm } from "src/modules/_shared/infra/entities";
import { CACHE_KEYS } from "src/modules/_shared/application/contants/keys";
import { SHARED_PORT_TOKENS } from "src/modules/_shared/application/ports/tokens";
import { CachePort } from "src/modules/_shared/application/ports/cache.port";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { LogPort } from "src/modules/_shared/application/ports/log-port";

@Injectable()
export class LogBenchmarkAdapter {
    constructor(
        @InjectRepository(LogBenchmarkOrm)
        private readonly logBenchmarkRepository: Repository<LogBenchmarkOrm>,
        @InjectRepository(LogServiceOrm)
        private readonly logServiceRepository: Repository<LogServiceOrm>,
        @Inject(SHARED_PORT_TOKENS.CACHE)
        private readonly cache: CachePort,
        @Inject(SHARED_PORT_TOKENS.LOG)
        private readonly log: LogPort,
    ) { }

    async handleBenchmark(start: number, logContext: string) {
        try {
            const end = performance.now();
            const duration = Math.round(end - start);
            const idService = await this.getServiceId(logContext);
            await this.logBenchmarkRepository.save({
                idService,
                duration,
            });
            console.log(`Serviço ${logContext} executado em ${duration}ms`);
        } catch (error) {
            this.log.error(`Erro ao salvar benchmark: ${error.message}`, logContext);
        }
    }

    private async getServiceId(logContext: string): Promise<number> {
        let idService = await this.cache.get(`${CACHE_KEYS.SERVICE_NAME}:${logContext}`);
        if (idService) return Number(idService);
        const service = await this.logServiceRepository.findOne({
            select: ['id'],
            where: { service: ILike(logContext.toLowerCase()) }
        });
        if (service && service.id) {
            await this.cache.set(`${CACHE_KEYS.SERVICE_NAME}:${logContext}`, service.id);
            return service.id;
        }
        const newService = await this.logServiceRepository.save({ service: logContext });
        await this.cache.set(`${CACHE_KEYS.SERVICE_NAME}:${logContext}`, newService.id);
        return newService.id;
    }
}
