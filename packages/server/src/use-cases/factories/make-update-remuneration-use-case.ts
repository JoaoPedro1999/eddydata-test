import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { PrismaRemunerationsRepository } from '@/repositories/prisma/prisma-remunerations-repository'

import { UpdateRemunerationUseCase } from '../update-remuneration'

export function makeUpdateRemunerationUseCase() {
  const employersRepository = new PrismaEmployersRepository()
  const remunerationsRepository = new PrismaRemunerationsRepository()

  const updateRemunerationUseCase = new UpdateRemunerationUseCase(
    remunerationsRepository,
    employersRepository,
  )

  return updateRemunerationUseCase
}
