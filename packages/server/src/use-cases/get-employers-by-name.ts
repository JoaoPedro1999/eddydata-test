import { EmployerRepository } from '@/repositories/employers-repository'
import { Employer } from '@prisma/client'

interface GetEmployersByNameRequest {
  name: string
}

interface GetEmployersByNameResponse {
  employers: Employer[]
}

export class GetEmployersByNameUseCase {
  constructor(private employersRepository: EmployerRepository) {}

  async execute({
    name,
  }: GetEmployersByNameRequest): Promise<GetEmployersByNameResponse> {
    const employers = await this.employersRepository.findByName(name)

    return { employers }
  }
}
