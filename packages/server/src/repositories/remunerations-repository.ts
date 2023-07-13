import { Prisma, Remuneration } from '@prisma/client'

export interface RemunerationsRepository {
  getRemunerationsByEmployerId(
    employerId: string,
  ): Promise<Remuneration[] | null>
  getLastRemunerationByEmployerId(
    employerId: string,
  ): Promise<Remuneration | null>
  getRemunerationSumByCity(city: string): Promise<number>
  getRemunerationSumByGender(): Promise<number>
  getRemunerationSumByRemunerationType(): Promise<[]>
  create(data: Prisma.RemunerationCreateInput): Promise<Remuneration>
  update(data: Prisma.RemunerationUpdateInput): Promise<Remuneration>
}
