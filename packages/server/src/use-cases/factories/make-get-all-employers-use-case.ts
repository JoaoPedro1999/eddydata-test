import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { GetAllEmployersUseCase } from '../get-all-employers'

export function makeGetAllEmployersUseCase() {
  const employersRepository = new PrismaEmployersRepository()

  const getAllEmployersUseCase = new GetAllEmployersUseCase(employersRepository)

  return getAllEmployersUseCase
}
