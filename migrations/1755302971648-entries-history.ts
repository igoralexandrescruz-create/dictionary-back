import { MigrationInterface, QueryRunner } from "typeorm";

export class EntriesHistory1755302971648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE entries.history (
                id SERIAL PRIMARY KEY,
                id_entry INTEGER NOT NULL,
                id_user INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (id_entry) REFERENCES entries.entries(id),
                FOREIGN KEY (id_user) REFERENCES users.users(id)
            )
        `);
        await queryRunner.query(`
            CREATE INDEX idx_history_id_user ON entries.history (id_user);
        `);

        await queryRunner.query(`
            CREATE TABLE entries.favorites (
                id SERIAL PRIMARY KEY,
                id_entry INTEGER NOT NULL,
                id_user INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP,
                UNIQUE (id_entry, id_user),
                FOREIGN KEY (id_entry) REFERENCES entries.entries(id),
                FOREIGN KEY (id_user) REFERENCES users.users(id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE entries.history;
        `);
        await queryRunner.query(`
            DROP TABLE entries.favorites;
        `);
    }

}
