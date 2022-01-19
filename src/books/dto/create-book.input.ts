import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateBookInput {
  @Field()
  title: string

  @Field()
  desc: string

  @Field(() => [Int])
  userId: number[]
}
