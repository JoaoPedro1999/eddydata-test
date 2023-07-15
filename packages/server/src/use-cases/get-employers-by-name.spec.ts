import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'
import { GetEmployersByNameUseCase } from './get-employers-by-name'

let employerRepository: InMemoryEmployersRepository
let sut: GetEmployersByNameUseCase

describe('Get Employers By Name Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    sut = new GetEmployersByNameUseCase(employerRepository)
  })

  it('should be able to find employers by name range', async () => {
    await employerRepository.create({
      name: 'doe',
      birthdate: new Date(2022, 7, 14),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const employerTwo = await employerRepository.create({
      name: 'john',
      birthdate: new Date(2023, 7, 14),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const { employers } = await sut.execute({
      name: 'john',
    })

    expect(employers).toEqual([employerTwo])
  })
})
