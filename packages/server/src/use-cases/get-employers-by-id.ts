import { EmployerRepository } from '@/repositories/employers-repository'
import { Employer } from '@prisma/client'
import { EmployerNotFoundError } from './errors/employer-not-found'

interface GetEmployersByIdRequest {
  employerId: string
}

interface GetEmployersByIdResponse {
  employer: Employer
}

export class GetEmployersByIdUseCase {
  constructor(private employersRepository: EmployerRepository) {}

  async execute({
    employerId,
  }: GetEmployersByIdRequest): Promise<GetEmployersByIdResponse> {
    const employer = await this.employersRepository.findById(employerId)

    if (!employer) {
      throw new EmployerNotFoundError()
    }

    return { employer }
  }
}
