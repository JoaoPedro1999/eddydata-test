import { EmployerRepository } from '@/repositories/employers-repository'
import { Employer } from '@prisma/client'
import { EmployerNotFoundError } from './errors/employer-not-found'

interface UpdateEmployerUseCaseRequest {
  id: string
  birthdate: Date
  email: string
  name: string
  gender: 'MALE' | 'FEMALE'
}

interface UpdateEmployerUseCaseResponse {
  employer: Employer
}

export class UpdateEmployerUseCase {
  constructor(private employersRepository: EmployerRepository) {}

  async execute({
    id,
    birthdate,
    email,
    gender,
    name,
  }: UpdateEmployerUseCaseRequest): Promise<UpdateEmployerUseCaseResponse> {
    const findEmployer = await this.employersRepository.findById(id)

    if (!findEmployer) {
      throw new EmployerNotFoundError()
    }

    const employer = await this.employersRepository.update({
      birthdate,
      email,
      gender,
      name,
    })

    return { employer }
  }
}
