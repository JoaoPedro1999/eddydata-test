import {
  RemunerationsRepository,
  getRemunerationSumByGenderReturn,
} from '@/repositories/remunerations-repository'

interface GetRemunerationSumByGenderUseCaseResponse {
  remunerations: getRemunerationSumByGenderReturn[]
}

export class GetRemunerationSumByGenderUseCase {
  constructor(private remunerationsRepository: RemunerationsRepository) {}

  async execute(): Promise<GetRemunerationSumByGenderUseCaseResponse> {
    const remunerations =
      await this.remunerationsRepository.getRemunerationSumByGender()

    return { remunerations }
  }
}
