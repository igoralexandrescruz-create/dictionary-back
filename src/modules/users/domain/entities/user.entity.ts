import { IdPublic } from "src/modules/_shared/domain/value-objects/id-public";
import { Email } from "../value-objects/email";

type UserParams = {
    id: number;
    idPublic: IdPublic;
    name: string;
    email: Email;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export class User {
    private constructor(private props: UserParams) { }

    static create(params: UserParams) {
        return new User(params);
    }

    get id() { return this.props.id; }

    get idPublic() { return this.props.idPublic.toString(); }

    get name() { return this.props.name; }

    get email() { return this.props.email.toString(); }

    get password() { return this.props.password; }

    get createdAt() { return this.props.createdAt; }

}

