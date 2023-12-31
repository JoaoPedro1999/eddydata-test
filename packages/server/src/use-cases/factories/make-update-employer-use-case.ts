import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { UpdateEmployerUseCase } from '../update-employer'

export function makeUpdateEmployerUseCase() {
  const employersRepository = new PrismaEmployersRepository()

  const updateEmployerUseCase = new UpdateEmployerUseCase(employersRepository)

  return updateEmployerUseCase
}
