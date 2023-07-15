import { Remuneration, RemunerationType } from '@prisma/client'
import { RemunerationsRepository } from '@/repositories/remunerations-repository'
import { EmployerRepository } from '@/repositories/employers-repository'
import { EmployerNotFoundError } from './errors/employer-not-found'

interface UpdateRemunerationUseCaseRequest {
  employerId: string
  remunerationId: string
  payday: Date | string
  remuneration_value: number | string
  remuneration_type: RemunerationType
}

interface UpdateRemunerationUseCaseResponse {
  remuneration: Remuneration
}

export class UpdateRemunerationUseCase {
  constructor(
    private remunerationsRepository: RemunerationsRepository,
    private employersRepository: EmployerRepository,
  ) {}

  async execute({
    remunerationId,
    employerId,
    payday,
    remuneration_type,
    remuneration_value,
  }: UpdateRemunerationUseCaseRequest): Promise<UpdateRemunerationUseCaseResponse> {
    const findEmployer = await this.employersRepository.findById(employerId)

    if (!findEmployer) {
      throw new EmployerNotFoundError()
    }

    const remuneration = await this.remunerationsRepository.update({
      id: remunerationId,
      employer_id: findEmployer.id,
      payday,
      remuneration_value,
      remuneration_type,
    })

    return { remuneration }
  }
}
