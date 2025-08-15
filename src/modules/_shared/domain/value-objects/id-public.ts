export class IdPublic {
    private constructor(private readonly value: string) { }

    static create(value: string): { idPublic: IdPublic, error: string | null } {
        if (value.length !== 26) {
            return { error: 'Invalid id public', idPublic: null };
        }
        return { idPublic: new IdPublic(value), error: null };
    }

    toString(): string {
        return this.value;
    }
}