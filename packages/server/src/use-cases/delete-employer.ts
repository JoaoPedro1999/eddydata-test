import { EmployerRepository } from '@/repositories/employers-repository'

interface DeleteEmployerUseCaseRequest {
  employerId: string
}

export class DeleteEmployerUseCase {
  constructor(private employersRepository: EmployerRepository) {}

  async execute({ employerId }: DeleteEmployerUseCaseRequest): Promise<void> {
    await this.employersRepository.delete(employerId)
  }
}
