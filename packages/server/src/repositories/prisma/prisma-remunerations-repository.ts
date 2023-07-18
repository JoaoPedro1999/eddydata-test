import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import {
  RemunerationsRepository,
  getRemunerationSumByCityReturn,
  getRemunerationSumByGenderReturn,
} from '../remunerations-repository'

export class PrismaRemunerationsRepository implements RemunerationsRepository {
  async create(data: Prisma.RemunerationUncheckedCreateInput) {
    const remuneration = await prisma.remuneration.create({
      data,
    })

    return remuneration
  }

  async update(data: Prisma.RemunerationUncheckedUpdateInput) {
    const remuneration = await prisma.remuneration.update({
      where: {
        id: String(data.id),
      },
      data,
    })

    return remuneration
  }

  async getLastRemunerationByEmployerId(employerId: string) {
    const remuneration = await prisma.remuneration.findFirst({
      where: {
        employer_id: employerId,
      },
    })

    return remuneration
  }

  async getRemunerationsByEmployerId(employerId: string) {
    const remunerations = await prisma.remuneration.findMany({
      where: {
        employer_id: employerId,
      },
      orderBy: {
        payday: 'desc',
      },
    })

    return remunerations
  }

  async getRemunerationSumByCity() {
    const remunerationSumByCity = await prisma.$queryRawUnsafe<
      getRemunerationSumByCityReturn[]
    >(
      'SELECT addresses.city, sum(remunerations.remuneration_value) FROM remunerations, employers, addresses WHERE remunerations.employer_id = employers.id AND addresses.employer_id = employers.id GROUP BY addresses.city',
    )

    return remunerationSumByCity
  }

  async getRemunerationSumByGender() {
    const remunerationSumByGender = await prisma.$queryRawUnsafe<
      getRemunerationSumByGenderReturn[]
    >(
      'SELECT employers.gender, sum(remunerations.remuneration_value) FROM remunerations, employers WHERE remunerations.employer_id = employers.id GROUP BY employers.gender',
    )

    return remunerationSumByGender
  }

  async getRemunerationSumByRemunerationType() {
    const remunerationSumByRemunerationType = await prisma.remuneration.groupBy(
      {
        by: ['remuneration_type'],
        _sum: {
          remuneration_value: true,
        },
      },
    )

    return remunerationSumByRemunerationType
  }
}
