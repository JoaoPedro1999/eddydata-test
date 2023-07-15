import { GetRemunerationSumByGenderUseCase } from '../get-remuneration-sum-by-gender'
import { PrismaRemunerationsRepository } from '@/repositories/prisma/prisma-remunerations-repository'

export function makeCreateRemunerationUseCase() {
  const remunerationRepository = new PrismaRemunerationsRepository()

  const getRemunerationSumByGenderUseCase =
    new GetRemunerationSumByGenderUseCase(remunerationRepository)

  return getRemunerationSumByGenderUseCase
}
