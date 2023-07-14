import { EmployerRepository } from '@/repositories/employers-repository'

interface DeleteEmployerUseCaseRequest {
  id: string
}

export class DeleteEmployerUseCase {
  constructor(private employersRepository: EmployerRepository) {}

  async execute({ id }: DeleteEmployerUseCaseRequest): Promise<void> {
    await this.employersRepository.delete(id)
  }
}
