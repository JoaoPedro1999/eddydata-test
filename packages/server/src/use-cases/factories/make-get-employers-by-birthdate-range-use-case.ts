import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { GetEmployersByBirthdateRangeUseCase } from '../get-employers-by-birthdate-range'

export function makeGetEmployersByBirthdateRangeUseCase() {
  const employersRepository = new PrismaEmployersRepository()

  const getEmployersByBirthdateRangeUseCase =
    new GetEmployersByBirthdateRangeUseCase(employersRepository)

  return getEmployersByBirthdateRangeUseCase
}
