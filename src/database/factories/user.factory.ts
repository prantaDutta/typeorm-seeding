import { define } from 'typeorm-seeding'
import Faker from 'faker'
import { User } from '../../user/entities/user.entity'
import { Role } from '../../user/role.enum'

const randomEnumValue = (enumeration) => {
  const values = Object.keys(enumeration)
  const enumKey = values[Math.floor(Math.random() * values.length)]
  return enumeration[enumKey]
}

define(User, (faker: typeof Faker) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  const user = new User()
  user.name = `${firstName} ${lastName}`
  user.username = faker.internet.userName()
  user.role = randomEnumValue(Role)
  user.password = '123'
  console.log('Something')
  return user
})
