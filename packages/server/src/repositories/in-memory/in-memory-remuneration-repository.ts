import { Remuneration, Prisma, RemunerationType } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { RemunerationsRepository } from '@/repositories/remunerations-repository'

export class InMemoryRemunerationsRepository
  implements RemunerationsRepository
{
  public items: Remuneration[] = []

  async create(data: Prisma.RemunerationCreateInput) {
    const remuneration = {
      id: randomUUID(),
      remuneration_value: data.remuneration_value as Prisma.Decimal,
      payday: new Date(data.payday),
      remuneration_type: data.remuneration_type as RemunerationType,
      created_at: new Date(),
      employer_id: String(data.employer.connect?.id),
    }

    this.items.push(remuneration)

    return remuneration
  }

  async update(data: Prisma.RemunerationUpdateInput) {
    const findIndex = this.items.findIndex((item) => item.id === data.id)

    const remuneration = {
      id: String(data.id),
      remuneration_value: data.remuneration_value as Prisma.Decimal,
      payday: new Date(String(data.payday)),
      remuneration_type: data.remuneration_type as RemunerationType,
      created_at: new Date(),
      employer_id: String(data.employer?.connect?.id),
    }

    this.items[findIndex] = remuneration

    return remuneration
  }

  async getRemunerationsByEmployerId(employerId: string) {
    const remunerations = this.items.filter(
      (item) => item.employer_id === employerId,
    )

    return remunerations
  }

  async getLastRemunerationByEmployerId(employerId: string) {
    const remuneration = this.items.find(
      (item) => item.employer_id === employerId,
    )

    if (!remuneration) {
      return null
    }

    return remuneration
  }

  async getRemunerationSumByCity() {
    return [
      {
        city: 'Franca',
        sum: '1000',
      },
    ]
  }

  async getRemunerationSumByRemunerationType() {
    return []
  }

  async getRemunerationSumByGender() {
    return [
      {
        gender: 'Franca',
        sum: '1000',
      },
    ]
  }
}
