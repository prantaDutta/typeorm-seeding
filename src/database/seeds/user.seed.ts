import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../../user/entities/user.entity'

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(10)
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values([
    //     { name: 'pranta', username: 'pranta', password: '123' },
    //     { name: 'joy', username: 'joy', password: '123' },
    //   ])
    //   .execute()
  }
}
