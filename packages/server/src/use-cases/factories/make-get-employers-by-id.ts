import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { GetEmployersByIdUseCase } from '../get-employers-by-id'

export function makeCreateEmployerUseCase() {
  const employersRepository = new PrismaEmployersRepository()

  const getEmployersByIdUseCase = new GetEmployersByIdUseCase(
    employersRepository,
  )

  return getEmployersByIdUseCase
}
