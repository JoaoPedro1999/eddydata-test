import { PrismaEmployersRepository } from '@/repositories/prisma/prisma-employers-repository'
import { DeleteEmployerUseCase } from '../delete-employer'

export function makeDeleteEmployerUseCase() {
  const employersRepository = new PrismaEmployersRepository()

  const deleteEmployerUseCase = new DeleteEmployerUseCase(employersRepository)

  return deleteEmployerUseCase
}
