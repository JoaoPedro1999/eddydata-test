import {
  RemunerationsRepository,
  getRemunerationSumByCityReturn,
} from '@/repositories/remunerations-repository'

interface GetRemunerationSumByCityUseCaseResponse {
  remunerations: getRemunerationSumByCityReturn[]
}

export class GetRemunerationSumByCityUseCase {
  constructor(private remunerationsRepository: RemunerationsRepository) {}

  async execute(): Promise<GetRemunerationSumByCityUseCaseResponse> {
    const remunerations =
      await this.remunerationsRepository.getRemunerationSumByCity()

    return { remunerations }
  }
}
