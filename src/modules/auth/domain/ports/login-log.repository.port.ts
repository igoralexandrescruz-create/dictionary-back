export interface LoginLogRepositoryPort {
    save(idUser: number): Promise<void>;
}
