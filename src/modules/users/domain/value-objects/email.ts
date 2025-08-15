export class Email {
    private constructor(private readonly value: string) { }

    static create(value: string): { email: Email, error: string | null } {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return { error: 'Invalid email', email: null };
        }
        return { email: new Email(value), error: null };
    }

    toString(): string {
        return this.value;
    }
}