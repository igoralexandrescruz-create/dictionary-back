export interface JwtPort {
    sign<T>(payload: T, expiresIn: number): string;
    verify<T>(token: string): Promise<T | null>;
}