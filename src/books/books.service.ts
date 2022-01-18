import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'
import { Connection, Repository } from 'typeorm'

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private connection: Connection
  ) {}

  create(createBookInput: CreateBookInput) {
    try {
      const newBook = this.booksRepository.create({
        ...createBookInput,
      })
      return this.booksRepository.save(newBook)
    } catch (e) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: "Can't insert book to the database",
        error: e?.message,
      })
    }
  }

  findAll() {
    return this.booksRepository.find()
  }

  findOne(id: number) {
    return this.booksRepository.findOne(id)
  }

  async update(
    id: number,
    { title, desc }: UpdateBookInput
  ): Promise<Book | null> {
    const book = await this.connection
      .createQueryBuilder()
      .update(Book)
      .set({
        title,
        desc,
      })
      .where('id = :id', { id })
      .returning('*')
      .execute()

    if (book.raw.length > 0) {
      return book.raw[0]
    }

    return null
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.booksRepository.delete(id)
      return true
    } catch (e) {
      return false
    }
  }
}
