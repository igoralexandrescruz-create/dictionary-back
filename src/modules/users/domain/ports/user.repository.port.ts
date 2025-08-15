import { User } from "src/modules/users/domain/entities";

export interface UserRepositoryPort {
    findByEmail(email: string): Promise<User | null>;
}