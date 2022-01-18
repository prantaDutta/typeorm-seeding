import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BooksService } from './books.service'
import { Book } from './entities/book.entity'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput)
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll()
  }

  @Query(() => Book, { name: 'book', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id)
  }

  @Mutation(() => Book, { nullable: true })
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput.id, updateBookInput)
  }

  @Mutation(() => Book, { nullable: true })
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.remove(id)
  }
}
