import { registerAs } from '@nestjs/config'

export default registerAs('database', () => {
  return {
    type: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'library',
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    dropSchema: process.env.DB_DROP_SCHEMA === 'true',
    // Either make migrationsRun to true or make synchronize to true
    // but not both at the same time, it will create the same table twice
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    cli: {
      migrationsDir: 'src/database/migrations',
    },
    // Typeorm seeding
    seeds: ['src/database/seeds/**/*.seed{.ts,.js}'],
    factories: ['src/database/factories/**/*.factory{.ts,.js}'],
  }
})
