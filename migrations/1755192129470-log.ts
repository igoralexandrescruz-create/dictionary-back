import { MigrationInterface, QueryRunner } from "typeorm";

export class Log1755192129470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA log;`);
        await queryRunner.query(
            `CREATE TABLE log.type (
            id SMALLINT PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL
        );`,
        );
        await queryRunner.query(
            `INSERT INTO log.type (id, name) VALUES (1, 'INFO'), (2, 'ERROR'), (3, 'FATAL');`,
        );
        await queryRunner.query(`CREATE TABLE log.generic (
            id SERIAL PRIMARY KEY NOT NULL,
            message TEXT NOT NULL,
            id_type SMALLINT NOT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT now(),
            CONSTRAINT fk_log_type FOREIGN KEY (id_type) REFERENCES log.type (id)
        );`);
        await queryRunner.query(`
            CREATE TABLE log.service (
                id SERIAL PRIMARY KEY,
                service VARCHAR(255) NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE log.benchmark (
                id SERIAL PRIMARY KEY,
                id_service INTEGER NOT NULL,
                duration INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (id_service) REFERENCES log.service(id)
            )
        `);
        await queryRunner.query(`CREATE TABLE log.login (
            id SERIAL PRIMARY KEY,
            id_user INTEGER NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_user) REFERENCES users.users (id)
          )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP SCHEMA log CASCADE;`);
    }

}
