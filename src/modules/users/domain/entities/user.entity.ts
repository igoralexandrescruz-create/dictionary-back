import { IdPublic } from "src/modules/_shared/domain/value-objects/id-public";
import { Email } from "../value-objects/email";

export class User {
    private constructor(private props: UserProps) { }

    static create(params: UserProps) {
        return new User({
            id: 0, // Será gerado pelo banco de dados
            idPublic: params.idPublic,
            name: params.name,
            email: params.email,
            password: params.password
        });
    }

    get id() { return this.props.id; }

    get idPublic() { return this.props.idPublic.toString(); }

    get name() { return this.props.name; }

    get email() { return this.props.email.toString(); }

    get password() { return this.props.password; }

    get createdAt() { return this.props.createdAt; }

    get updatedAt() { return this.props.updatedAt; }

    get deletedAt() { return this.props.deletedAt; }

}

type UserProps = {
    id?: number;
    idPublic: IdPublic;
    name: string;
    email: Email;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
