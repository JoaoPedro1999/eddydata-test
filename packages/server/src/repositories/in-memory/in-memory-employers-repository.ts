import { Employer, GenderType, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { EmployerRepository } from '@/repositories/employers-repository'
import { GetResult } from '@prisma/client/runtime/library'

export class InMemoryEmployersRepository implements EmployerRepository {
  public items: Employer[] = []

  async findAllEmployers() {
    return this.items
  }

  async findByBirthDateRange(initialBirthDate: string, finalBirthDate: string) {
    const employers = this.items.filter(
      (item) =>
        item.birthdate > new Date(initialBirthDate) &&
        item.birthdate < new Date(finalBirthDate),
    )

    return employers
  }

  async findByName(name: string) {
    const employers = this.items.filter((item) => item.name.includes(name))

    return employers
  }

  async findById(employerId: string) {
    const employer = this.items.find((item) => item.id === employerId)

    if (!employer) {
      return null
    }

    return employer
  }

  async findByEmail(email: string) {
    const employer = this.items.find((item) => item.email === email)

    if (!employer) {
      return null
    }

    return employer
  }

  async findByUserId(userId: string) {
    const employer = this.items.find((item) => item.user_id === userId)

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

  async delete(employerId: string) {
    const findEmployer = this.items.findIndex((item) => item.id === employerId)

    this.items.splice(findEmployer, 1)
  }
}
