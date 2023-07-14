import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { GetEmployersByNameRangeUseCase } from '../get-employers-by-name'

export function makeCreateEmployerUseCase() {
  const employersRepository = new PrismaEmployersRepository()

  const getEmployersByNameRangeUseCase = new GetEmployersByNameRangeUseCase(
    employersRepository,
  )

  return getEmployersByNameRangeUseCase
}
