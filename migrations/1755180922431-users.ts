import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1755180922431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE SCHEMA users;
        `);

        await queryRunner.query(`
            CREATE TABLE users.users (
                id SERIAL PRIMARY KEY,
                id_public CHAR(26) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password CHAR(60) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP
            )
        `);

        await queryRunner.query(`
            CREATE INDEX idx_users_id_public ON users.users (id_public);
            CREATE INDEX idx_users_email ON users.users (email);
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP SCHEMA users CASCADE;
        `);
    }

}
