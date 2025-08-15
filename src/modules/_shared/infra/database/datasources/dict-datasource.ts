import 'dotenv/config';
import { env } from '../../../../../config/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const DictDatasourceModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  entities: [`${__dirname}/../../../../*/infra/entities/*.{ts,js}`],
  synchronize: false,
  logging: env.server.debug,
});

//Para migrations apenas
export const DictDatasourceMigration = new DataSource({
  type: 'postgres',
  host: env.database.host,
  port: env.database.port,
  username: env.database.username,
  password: env.database.password,
  database: env.database.database,
  migrations: [`${__dirname}/../../../../../../migrations/*.ts`],
  subscribers: [],
  synchronize: false,
  logging: true,
});
