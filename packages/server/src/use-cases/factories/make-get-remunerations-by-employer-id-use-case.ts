import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { GetRemunerationsByEmployerIdUseCase } from '../get-remunerations-by-employer-id'
import { PrismaRemunerationsRepository } from '@/repositories/prisma/prisma-remunerations-repository'

export function makeGetRemunerationsByEmployerIdUseCase() {
  const employersRepository = new PrismaEmployersRepository()
  const remunerationRepository = new PrismaRemunerationsRepository()

  const getRemunerationsByEmployerIdUseCase =
    new GetRemunerationsByEmployerIdUseCase(
      remunerationRepository,
      employersRepository,
    )

  return getRemunerationsByEmployerIdUseCase
}
