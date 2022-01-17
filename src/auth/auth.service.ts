import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { UsersService } from '../user/users.service'
import { verify } from 'argon2'
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { SignupUserInput } from './dto/signup-user.input'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username)

    if (user && (await verify(user.password, password))) {
      const { password, ...rest } = user
      return rest
    }

    return null
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    }
  }

  async signup({ username, name, password }: SignupUserInput) {
    const user = await this.userService.findOneByUsername(username)
    if (user) {
      throw new UnprocessableEntityException('User Already Exists')
    }

    return this.userService.create({
      username,
      name,
      password,
    })
  }
}
