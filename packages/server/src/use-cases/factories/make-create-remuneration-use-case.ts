import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { CreateRemunerationUseCase } from '../create-remuneration'
import { PrismaRemunerationsRepository } from '@/repositories/prisma/prisma-remunerations-repository'

export function makeCreateRemunerationUseCase() {
  const employersRepository = new PrismaEmployersRepository()
  const remunerationRepository = new PrismaRemunerationsRepository()

  const createRemunerationUseCase = new CreateRemunerationUseCase(
    remunerationRepository,
    employersRepository,
  )

  return createRemunerationUseCase
}
