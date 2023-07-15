import { RemunerationsRepository } from '@/repositories/remunerations-repository'

interface GetRemunerationSumByCityUseCaseResponse {
  remunerations: unknown[]
}

export class GetRemunerationSumByRemunerationTypeUseCase {
  constructor(private remunerationsRepository: RemunerationsRepository) {}

  async execute(): Promise<GetRemunerationSumByCityUseCaseResponse> {
    const remunerations =
      await this.remunerationsRepository.getRemunerationSumByRemunerationType()

    return { remunerations }
  }
}
