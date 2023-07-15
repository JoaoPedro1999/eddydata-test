import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { GetLastRemunerationByEmployerIdUseCase } from '../get-last-remuneration-by-employer-id'
import { PrismaRemunerationsRepository } from '@/repositories/prisma/prisma-remunerations-repository'

export function makeGetLastRemunerationByEmployerIdUseCase() {
  const employersRepository = new PrismaEmployersRepository()
  const remunerationRepository = new PrismaRemunerationsRepository()

  const getLastRemunerationByEmployerIdUseCase =
    new GetLastRemunerationByEmployerIdUseCase(
      remunerationRepository,
      employersRepository,
    )

  return getLastRemunerationByEmployerIdUseCase
}
