import { UsersRepository } from '@/repositories/users-repository'
import { User, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async update(data: Prisma.UserUpdateInput) {
    const findIndex = this.items.findIndex((item) => item.id === data.id)

    const user = {
      id: String(data.id),
      email: String(data.email),
      password_hash: String(data.password_hash),
      created_at: new Date(String(data.created_at)),
    }

    this.items[findIndex] = user

    return user
  }
}
