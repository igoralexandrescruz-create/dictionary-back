import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginLogRepositoryPort } from 'src/modules/auth/domain/ports';
import { LogLoginOrm } from 'src/modules/_shared/infra/entities';

@Injectable()
export class LoginLogRepositoryOrm implements LoginLogRepositoryPort {
    constructor(
        @InjectRepository(LogLoginOrm)
        private readonly loginLogRepository: Repository<LogLoginOrm>,
    ) { }

    async save(idUser: number): Promise<void> {
        const loginLogOrm = new LogLoginOrm();
        loginLogOrm.idUser = idUser;
        loginLogOrm.createdAt = new Date();
        await this.loginLogRepository.save(loginLogOrm);
    }


}
