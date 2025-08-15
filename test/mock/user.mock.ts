import { IdPublic } from "src/modules/_shared/domain/value-objects/id-public";
import { User } from "src/modules/users/domain/entities";
import { Email } from "src/modules/users/domain/value-objects/email";

export const mockUser = ({
    id = 1,
    idPublic = '01K2QK7J9S8BAPZTA17V7C5427',
    email = 'test@test.com',
    password = '123456',
    name = 'Test User'
}: UserMock): User => {
    return User.create({
        id,
        idPublic: IdPublic.create(idPublic).idPublic,
        email: Email.create(email).email,
        password,
        name,
    })
}

type UserMock = {
    id?: number;
    idPublic?: string;
    email?: string;
    password?: string;
    name?: string;
}