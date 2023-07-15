import { Prisma, Remuneration } from '@prisma/client'

export interface getRemunerationSumByCityReturn {
  city: string
  sum: string
}

export interface getRemunerationSumByGenderReturn {
  gender: string
  sum: string
}
export interface RemunerationsRepository {
  getRemunerationsByEmployerId(
    employerId: string,
  ): Promise<Remuneration[] | null>
  getLastRemunerationByEmployerId(
    employerId: string,
  ): Promise<Remuneration | null>
  getRemunerationSumByCity(): Promise<getRemunerationSumByCityReturn[]>
  getRemunerationSumByGender(): Promise<getRemunerationSumByGenderReturn[]>
  getRemunerationSumByRemunerationType(): Promise<unknown[]>
  create(data: Prisma.RemunerationUncheckedCreateInput): Promise<Remuneration>
  update(data: Prisma.RemunerationUncheckedUpdateInput): Promise<Remuneration>
}
