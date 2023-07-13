import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { RemunerationsRepository } from '../remunerations-repository'

export class PrismaRemunerationsRepository implements RemunerationsRepository {
  async create(data: Prisma.RemunerationCreateInput) {
    const remuneration = await prisma.remuneration.create({
      data,
    })

    return remuneration
  }

  async update(data: Prisma.RemunerationUpdateInput) {
    const remuneration = await prisma.remuneration.update({
      where: {
        id: String(data.id),
      },
      data,
    })

    return remuneration
  }

  async getRemunerationSumByCity(city: string): Promise<number> {
    const remunerationSumByCity = await prisma.remuneration.groupBy({})

    return remunerationSumByCity
  }

  async getRemunerationSumByGender(): Promise<number> {
    const remunerationSumByCity = await prisma.remuneration.groupBy({
      where: {
        employer: {
          gender: {
            equals: 'FEMALE',
          },
        },
      },
      by: ['remuneration_value'],
    })

    return remunerationSumByCity
  }

  async getRemunerationSumByRemunerationType() {
    const remunerationSumByRemunerationType = await prisma.remuneration.groupBy(
      {
        by: 'remuneration_type',
        _sum: {
          remuneration_value: true,
        },
      },
    )

    return remunerationSumByRemunerationType
  }
}
