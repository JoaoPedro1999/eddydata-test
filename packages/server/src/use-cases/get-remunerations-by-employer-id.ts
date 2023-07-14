import { EmployerRepository } from '@/repositories/employers-repository'
import { RemunerationsRepository } from '@/repositories/remunerations-repository'
import { Remuneration } from '@prisma/client'
import { EmployerNotFoundError } from './errors/employer-not-found'

interface GetRemunerationsByEmployerIdUseCaseResponse {
  remunerations: Remuneration[] | null
}

export class GetRemunerationsByEmployerIdUseCase {
  constructor(
    private remunerationsRepository: RemunerationsRepository,
    private employersRepository: EmployerRepository,
  ) {}

  async execute(
    employerId: string,
  ): Promise<GetRemunerationsByEmployerIdUseCaseResponse> {
    const findEmployer = await this.employersRepository.findById(employerId)

    if (!findEmployer) {
      throw new EmployerNotFoundError()
    }

    const remunerations =
      await this.remunerationsRepository.getRemunerationsByEmployerId(
        employerId,
      )

    return { remunerations }
  }
}
