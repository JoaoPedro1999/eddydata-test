import { Remuneration, Prisma, RemunerationType } from '@prisma/client'
import { RemunerationsRepository } from '@/repositories/remunerations-repository'
import { EmployerRepository } from '@/repositories/employers-repository'
import { EmployerNotFoundError } from './errors/employer-not-found'

interface CreateRemunerationUseCaseRequest {
  employerId: string
  payday: Date | string
  remuneration_value: number | string
  remuneration_type: RemunerationType
}

interface CreateRemunerationUseCaseResponse {
  remuneration: Remuneration
}

export class CreateRemunerationUseCase {
  constructor(
    private remunerationsRepository: RemunerationsRepository,
    private employersRepository: EmployerRepository,
  ) {}

  async execute({
    employerId,
    payday,
    remuneration_type,
    remuneration_value,
  }: CreateRemunerationUseCaseRequest): Promise<CreateRemunerationUseCaseResponse> {
    const findEmployer = await this.employersRepository.findById(employerId)

    if (!findEmployer) {
      throw new EmployerNotFoundError()
    }

    const remuneration = await this.remunerationsRepository.create({
      employer:
        findEmployer as Prisma.EmployerCreateNestedOneWithoutRemunerationInput,
      payday,
      remuneration_value,
      remuneration_type,
    })

    return { remuneration }
  }
}
