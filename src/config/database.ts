import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
config();
const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;
export const development: DataSourceOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../modules/**/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migration/*.{js,ts}'],
  subscribers: ['src/subscriber/**/*.ts'],
  extra: {
    cli: {
      entitiesDir: `${__dirname}/../modules/**/entities`,
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },

  dropSchema: false,
};
export const test: DataSourceOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../modules/**/entities/*.entity.{js,ts}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  dropSchema: false,
};
