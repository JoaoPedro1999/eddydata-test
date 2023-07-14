import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { UpdateEmployerUseCase } from '../update-employer'

export function makeCreateEmployerUseCase() {
  const employersRepository = new PrismaEmployersRepository()

  const updateEmployerUseCase = new UpdateEmployerUseCase(employersRepository)

  return updateEmployerUseCase
}
