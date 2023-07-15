import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { EmployerRepository } from '../employers-repository'

export class PrismaEmployersRepository implements EmployerRepository {
  async findAllEmployers() {
    const employers = await prisma.employer.findMany({
      include: {
        adress: true,
      },
    })

    return employers
  }

  async findByBirthDateRange(initialBirthDate: string, finalBirthDate: string) {
    const employers = await prisma.employer.findMany({
      where: {
        birthdate: {
          gte: new Date(initialBirthDate),
          lte: new Date(finalBirthDate),
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
          mode: 'insensitive',
        },
      },
      include: {
        adress: true,
      },
    })

    return employer
  }

  async findById(employerId: string) {
    const employer = await prisma.employer.findFirst({
      where: {
        id: employerId,
      },
      include: {
        adress: true,
      },
    })

    return employer
  }

  async findByEmail(email: string) {
    const employer = await prisma.employer.findFirst({
      where: {
        email,
      },
      include: {
        adress: true,
      },
    })

    return employer
  }

  async findByUserId(userId: string) {
    const employer = await prisma.employer.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        adress: true,
      },
    })

    return employer
  }

  async create(data: Prisma.EmployerUncheckedCreateInput) {
    const employer = await prisma.employer.create({
      data,
    })

    return employer
  }

  async update(data: Prisma.EmployerUncheckedUpdateInput) {
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
