import { EmployerRepository } from '@/repositories/employers-repository'
import { Employer } from '@prisma/client'

interface GetAllEmployersResponse {
  employers: Employer[]
}

export class GetAllEmployersUseCase {
  constructor(private employersRepository: EmployerRepository) {}

  async execute(): Promise<GetAllEmployersResponse> {
    const employers = await this.employersRepository.findAllEmployers()

    return { employers }
  }
}
