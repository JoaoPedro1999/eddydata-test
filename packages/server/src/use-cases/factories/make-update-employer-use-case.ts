import { PrismaAdressesRepository } from '@/repositories/prisma/prisma-adresses-repository'
import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { CreateEmployerUseCase } from '../create-employer'

export function makeCreateEmployerUseCase() {
  const adressesRepository = new PrismaAdressesRepository()
  const employersRepository = new PrismaEmployersRepository()

  const createEmployerUseCase = new CreateEmployerUseCase(
    employersRepository,
    adressesRepository,
  )

  return createEmployerUseCase
}
