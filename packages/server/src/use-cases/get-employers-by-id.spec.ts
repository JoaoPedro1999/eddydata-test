import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'
import { GetEmployersByIdUseCase } from './get-employers-by-id'
import { EmployerNotFoundError } from './errors/employer-not-found'

let employerRepository: InMemoryEmployersRepository
let sut: GetEmployersByIdUseCase

describe('Get Employers By Id Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    sut = new GetEmployersByIdUseCase(employerRepository)
  })

  it('should be able to find employers by ID', async () => {
    const employerOne = await employerRepository.create({
      name: 'doe',
      birthdate: new Date(2022, 7, 14),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const { employer } = await sut.execute({
      employerId: employerOne.id,
    })

    expect(employer).toEqual(employerOne)
  })

  it('should not be able to find employers by ID what not exists', async () => {
    await expect(() =>
      sut.execute({
        employerId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(EmployerNotFoundError)
  })
})
