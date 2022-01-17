import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginResponse } from './dto/login-response'
import { LoginUserInput } from './dto/login-user.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './gql-auth.guard'
import { User } from '../user/entities/user.entity'
import { SignupUserInput } from './dto/signup-user.input'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') _loginUserInput: LoginUserInput,
    @Context() context
  ) {
    return this.authService.login(context.user)
  }

  @Mutation(() => User)
  signup(
    @Args('signupUserInput') signupUserInput: SignupUserInput,
    @Context() context
  ) {
    return this.authService.signup(signupUserInput)
  }
}
