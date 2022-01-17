import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'library',
  username: 'postgres',
  password: 'password',
  logging: true,
  // entities: [],
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrations: ['dist/**/*.migration{.ts,.js}'],
  synchronize: true,
  cli: {
    migrationsDir: 'src/db/migrations',
  },
}

export default ormConfig
