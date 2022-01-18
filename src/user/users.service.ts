import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create({ username, name, password }: CreateUserInput) {
    const newUser = this.usersRepository.create({
      name,
      username,
      password,
    })

    return this.usersRepository.save(newUser)
  }

  findAll() {
    return this.usersRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
    })
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
