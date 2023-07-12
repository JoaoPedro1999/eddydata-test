import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { EmployerRepository } from '../employers-repository'

export class PrismaEmployersRepository implements EmployerRepository {
  async findByBirthDateRange(initialBirthDate: string, finalBirthDate: string) {
    const user = await prisma.employer.findMany({
      where: {
        birthdate: {
          lte: initialBirthDate,
          gte: finalBirthDate,
        },
      },
    })

    return user
  }

  async findByName(name: string) {
    const employer = await prisma.employer.findMany({
      where: {
        name,
      },
    })

    return employer
  }

  async findById(employerId: string) {
    const employer = await prisma.employer.findFirst({
      where: {
        id: employerId,
      },
    })

    return employer
  }

  async create(data: Prisma.EmployerCreateInput) {
    const employer = await prisma.employer.create({
      data,
    })

    return employer
  }

  async update(data: Prisma.EmployerUpdateInput) {
    const employer = await prisma.employer.update({
      where: {
        id: String(data.id),
      },
      data,
    })

    return employer
  }
}
