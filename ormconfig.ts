// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const ormConfig: any = {
  type: 'postgres',
  database: 'library',
  username: 'postgres',
  password: 'password',
  logging: true,
  // entities: [],
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrations: ['dist/**/*.migration{.ts,.js}'],
  seeds: ['src/seeds/**/*{.ts,.js}'],
  factories: ['src/factories/**/*{.ts,.js}'],
  synchronize: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
}

export default ormConfig
