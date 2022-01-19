import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksResolver } from './books.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'
import { UsersModule } from '../user/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
