import { MigrationInterface, QueryRunner } from "typeorm";
import fs from 'fs';
import path from "path";

export class Entries1755294661157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const entriesFile = fs.readFileSync(path.join(__dirname, 'seed', 'english.txt'), 'utf8');
        const entries = entriesFile.split('\n');

        await queryRunner.query(`
            CREATE SCHEMA entries;
        `);
        await queryRunner.query(`
            CREATE TABLE entries.entries (
                id SERIAL PRIMARY KEY,
                word VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const chunkSize = 10_000;
        for (let i = 0; i < entries.length; i += chunkSize) {
            const chunk = entries.slice(i, i + chunkSize).filter(entry => entry.trim().length > 0);
            const values = chunk.map(entry => `('${entry.toLowerCase().trim().replaceAll('\'', '\'\'')}')`).join(',');
            await queryRunner.query(`
                INSERT INTO entries.entries (word) VALUES ${values};
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP SCHEMA entries CASCADE;`);
    }

}
