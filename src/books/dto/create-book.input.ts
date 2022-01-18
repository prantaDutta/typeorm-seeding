import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateBookInput {
  @Field()
  title: string

  @Field()
  desc: string
}
