export type SignupInput = {
    name: string;
    email: string;
    password: string;
}

export type SignupOutput = {
    token: string;
    user: {
        id: string //id público
        name: string;
    }
}