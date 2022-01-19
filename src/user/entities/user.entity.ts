import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from '../role.enum'
import { hash } from 'argon2'

@ObjectType()
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  username: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  @Field(() => Role)
  role: Role

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  created_at: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  updated_at: Date

  @BeforeInsert()
  async setPassword(password: string) {
    this.password = await hash(password || this.password)
  }
}
