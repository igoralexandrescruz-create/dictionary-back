import { UserRepositoryPort } from 'src/modules/users/domain/ports/user.repository.port';
import { User } from 'src/modules/users/domain/entities';
import { UsersOrm } from 'src/modules/users/infra/entities';
import { IdPublic } from 'src/modules/_shared/domain/value-objects/id-public';
import { Email } from 'src/modules/users/domain/value-objects/email';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryOrm implements UserRepositoryPort {
    constructor(
        @InjectRepository(UsersOrm)
        private readonly userRepository: Repository<UsersOrm>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        const userOrm = await this.userRepository.findOne({ where: { email } });
        if (!userOrm) {
            return null;
        }
        return this.mapToDomain(userOrm);
    }

    private mapToDomain(userOrm: UsersOrm): User {
        //Não será feito a verificação de erro
        //Pois o idPublic e o email já foram validados no momento da criação do usuário.
        const { idPublic } = IdPublic.create(userOrm.idPublic);
        const { email } = Email.create(userOrm.email);

        return User.create({
            id: userOrm.id,
            idPublic,
            name: userOrm.name,
            email,
            password: userOrm.password,
            createdAt: userOrm.createdAt,
            updatedAt: userOrm.updatedAt,
            deletedAt: userOrm.deletedAt,
        });
    }
}
