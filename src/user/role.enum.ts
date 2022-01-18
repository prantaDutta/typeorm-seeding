import { registerEnumType } from '@nestjs/graphql'

export enum Role {
  User = 'User',
  Admin = 'Admin',
  Author = 'Author',
  Librarian = 'Librarian',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'The basic Role',
})
