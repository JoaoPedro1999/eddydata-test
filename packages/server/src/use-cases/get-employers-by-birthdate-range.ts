import { EmployerRepository } from '@/repositories/employers-repository'
import { Employer } from '@prisma/client'

interface GetEmployersByBirthdateRangeRequest {
  initialBirthDate: Date | string
  finalBirthDate: Date | string
}

interface GetEmployersByBirthdateRangeResponse {
  employers: Employer[]
}

export class GetEmployersByBirthdateRangeUseCase {
  constructor(private employersRepository: EmployerRepository) {}

  async execute({
    initialBirthDate,
    finalBirthDate,
  }: GetEmployersByBirthdateRangeRequest): Promise<GetEmployersByBirthdateRangeResponse> {
    const employers = await this.employersRepository.findByBirthDateRange(
      initialBirthDate,
      finalBirthDate,
    )

    return { employers }
  }
}
