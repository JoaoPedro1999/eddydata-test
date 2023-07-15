import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { GetEmployersByNameUseCase } from '../get-employers-by-name'

export function makeGetEmployersByNameUseCase() {
  const employersRepository = new PrismaEmployersRepository()

  const getEmployersByNameUseCase = new GetEmployersByNameUseCase(
    employersRepository,
  )

  return getEmployersByNameUseCase
}
