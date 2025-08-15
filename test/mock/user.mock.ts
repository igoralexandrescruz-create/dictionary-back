import { IdPublic } from "src/modules/_shared/domain/value-objects/id-public";
import { User } from "src/modules/users/domain/entities";
import { Email } from "src/modules/users/domain/value-objects/email";

export const mockUser = (id = 1): User => {
    return User.create({
        id,
        idPublic: IdPublic.create('01K2QK7J9S8BAPZTA17V7C5427').idPublic,
        email: Email.create('test@test.com').email,
        password: '123456',
        name: 'Test User',
    })
}