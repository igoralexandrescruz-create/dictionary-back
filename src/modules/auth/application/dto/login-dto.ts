export type SigninInput = {
    email: string;
    password: string;
}

export type SigninOutput = {
    token: string;
    expiresIn: number;
    user: {
        id: string //id público
        name: string;
    }
}