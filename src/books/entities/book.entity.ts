import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { v4 } from 'uuid'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column({ type: 'varchar' })
  @Field(() => String)
  uniqueBookId = v4()

  @Column()
  @Field()
  title: string

  @Column()
  @Field()
  desc: string

  @Column({ default: 1 })
  @Field(() => Int)
  rating: number

  @ManyToMany(() => User)
  @JoinTable()
  authors: User[]

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  updatedAt: Date
}
