import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { CreateEmployerUseCase } from '../create-employer'
import { PrismaAdressesRepository } from '@/repositories/prisma/prisma-adresses-repository'

export function makeCreateEmployerUseCase() {
  const employersRepository = new PrismaEmployersRepository()
  const addressesRepository = new PrismaAdressesRepository()

  const createEmployerUseCase = new CreateEmployerUseCase(
    employersRepository,
    addressesRepository,
  )

  return createEmployerUseCase
}
