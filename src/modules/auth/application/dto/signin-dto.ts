export type SigninInput = {
    email: string;
    password: string;
}

export type SigninOutput = {
    token: string;
    user: {
        id: string //id público
        name: string;
    }
}