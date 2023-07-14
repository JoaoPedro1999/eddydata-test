import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'
import { DeleteEmployerUseCase } from './delete-employer'

let employerRepository: InMemoryEmployersRepository
let sut: DeleteEmployerUseCase

describe('Delete Employer Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    sut = new DeleteEmployerUseCase(employerRepository)
  })

  it('should be able to find employers by name range', async () => {
    const employerOne = await employerRepository.create({
      name: 'doe',
      birthdate: new Date(2022, 7, 14),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    await sut.execute({ id: employerOne.id })

    expect(employerRepository.items).length(0)
  })
})
