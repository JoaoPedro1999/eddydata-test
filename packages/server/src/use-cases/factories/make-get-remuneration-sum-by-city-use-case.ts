import { GetRemunerationSumByCityUseCase } from '../get-remuneration-sum-by-city'
import { PrismaRemunerationsRepository } from '@/repositories/prisma/prisma-remunerations-repository'

export function makeGetRemunerationSumByCityUseCase() {
  const remunerationRepository = new PrismaRemunerationsRepository()

  const getRemunerationSumByCityUseCase = new GetRemunerationSumByCityUseCase(
    remunerationRepository,
  )

  return getRemunerationSumByCityUseCase
}
