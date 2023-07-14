import { EmployerRepository } from '@/repositories/employers-repository'
import { RemunerationsRepository } from '@/repositories/remunerations-repository'
import { Remuneration } from '@prisma/client'
import { EmployerNotFoundError } from './errors/employer-not-found'

interface GetLastRemunerationByEmployerIdUseCaseResponse {
  remuneration: Remuneration | null
}

export class GetLastRemunerationByEmployerIdUseCase {
  constructor(
    private remunerationsRepository: RemunerationsRepository,
    private employersRepository: EmployerRepository,
  ) {}

  async execute(
    employerId: string,
  ): Promise<GetLastRemunerationByEmployerIdUseCaseResponse> {
    const findEmployer = await this.employersRepository.findById(employerId)

    if (!findEmployer) {
      throw new EmployerNotFoundError()
    }

    const remuneration =
      await this.remunerationsRepository.getLastRemunerationByEmployerId(
        employerId,
      )

    return { remuneration }
  }
}
