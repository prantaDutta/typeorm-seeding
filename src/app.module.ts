import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './user/users.module'
import { AuthModule } from './auth/auth.module'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { BooksModule } from './books/books.module'
import { DatabaseModule } from './database/database.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig from './config/database.config'

@Module({
  imports: [
    // ConfigModule,
    // TypeOrmModule.forRoot(ormConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    ConfigModule,
    DatabaseModule,
  ],
  providers: [AppService],
})
export class AppModule {}
