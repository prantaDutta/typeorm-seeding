import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Book } from './entities/book.entity'
import { Connection, Repository } from 'typeorm'
import { User } from '../user/entities/user.entity'
import { UsersService } from '../user/users.service'

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    private readonly usersService: UsersService,
    private connection: Connection
  ) {}

  async create({ title, desc, userId }: CreateBookInput) {
    const users: User[] = []
    for (let i = 0; i < userId.length; i++) {
      const user = await this.usersService.findOne(userId[i])
      users.push(user)
    }
    try {
      const newBook = this.booksRepository.create({
        title,
        desc,
        authors: users,
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
