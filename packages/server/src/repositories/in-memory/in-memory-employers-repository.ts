import { Employer, GenderType, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { EmployerRepository } from '@/repositories/employers-repository'

export class InMemoryUsersRepository implements EmployerRepository {
  public items: Employer[] = []

  async findByBirthDateRange(initialBirthDate: string, finalBirthDate: string) {
    const employers = this.items.filter(
      (item) =>
        item.birthdate > new Date(initialBirthDate) &&
        item.birthdate < new Date(finalBirthDate),
    )

    if (!employers) {
      return null
    }

    return employers
  }

  async findByName(name: string) {
    const employer = this.items.filter((item) => item.name === name)

    if (!employer) {
      return null
    }

    return employer
  }

  async findById(employerId: string) {
    const employer = this.items.find((item) => item.id === employerId)

    if (!employer) {
      return null
    }

    return employer
  }

  async create(data: Prisma.EmployerCreateInput) {
    const employer = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      birthdate: new Date(data.birthdate),
      gender: data.gender,
      created_at: new Date(),
      user_id: null,
    }

    this.items.push(employer)

    return employer
  }

  async update(data: Prisma.EmployerUpdateInput) {
    const findIndex = this.items.findIndex((item) => item.id === data.id)

    const employer = {
      id: String(data.id),
      name: String(data.name),
      email: String(data.email),
      user_id: String(data.user?.connect?.id),
      gender: String(data.gender) as GenderType,
      birthdate: new Date(String(data.birthdate)),
      created_at: new Date(String(data.created_at)),
    }

    this.items[findIndex] = employer

    return employer
  }
}
