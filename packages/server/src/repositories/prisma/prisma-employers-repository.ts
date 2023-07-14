import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { EmployerRepository } from '../employers-repository'

export class PrismaEmployersRepository implements EmployerRepository {
  async findByBirthDateRange(initialBirthDate: string, finalBirthDate: string) {
    const employers = await prisma.employer.findMany({
      where: {
        birthdate: {
          lte: initialBirthDate,
          gte: finalBirthDate,
        },
      },
    })

    return employers
  }

  async findByName(name: string) {
    const employer = await prisma.employer.findMany({
      where: {
        name: {
          contains: name,
        },
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

  async findByEmail(email: string) {
    const employer = await prisma.employer.findFirst({
      where: {
        email,
      },
    })

    return employer
  }

  async findByUserId(userId: string) {
    const employer = await prisma.employer.findFirst({
      where: {
        user_id: userId,
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
    await prisma.employer.delete({
      where: {
        id: String(data.id),
      },
      include: {
        adress: true,
        remuneration: true,
        user: true,
      },
    })

    const employer = await prisma.employer.update({
      where: {
        id: String(data.id),
      },
      data,
    })

    return employer
  }

  async delete(employerId: string) {
    await prisma.employer.delete({
      where: {
        id: employerId,
      },
      include: {
        adress: true,
        remuneration: true,
        user: true,
      },
    })
  }
}
