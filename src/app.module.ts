import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './user/users.module'
import { AuthModule } from './auth/auth.module'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { BooksModule } from './books/books.module'
import ormConfig from '../ormconfig'
import { ConfigModule } from '@nestjs/config'
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    ConfigModule,
  ],
  providers: [AppService],
})
export class AppModule {}
