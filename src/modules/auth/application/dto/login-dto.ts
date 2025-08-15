import { AuthenticatedUser } from "src/modules/_shared/application/contracts/authenticated-user.contract";

export type LoginInput = {
    email: string;
    password: string;
}

export type LoginOutput = {
    token: string;
    expiresIn: number;
    user: {
        id: string //id público
        name: string;
    }
}