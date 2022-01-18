import { Field, ObjectType } from '@nestjs/graphql'
import { Book } from '../entities/book.entity'
import { BookError } from './book-error'

@ObjectType()
export class BookResponse {
  @Field({ nullable: true })
  book?: Book

  @Field({ nullable: true })
  error?: BookError
}
