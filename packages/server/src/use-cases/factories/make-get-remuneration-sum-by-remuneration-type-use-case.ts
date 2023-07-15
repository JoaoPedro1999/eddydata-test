import { GetRemunerationSumByRemunerationTypeUseCase } from '../get-remuneration-sum-by-remuneration-type'
import { PrismaRemunerationsRepository } from '@/repositories/prisma/prisma-remunerations-repository'

export function makeGetRemunerationSumByRemunerationTypeUseCase() {
  const remunerationRepository = new PrismaRemunerationsRepository()

  const getRemunerationSumByRemunerationTypeUseCase =
    new GetRemunerationSumByRemunerationTypeUseCase(remunerationRepository)

  return getRemunerationSumByRemunerationTypeUseCase
}
