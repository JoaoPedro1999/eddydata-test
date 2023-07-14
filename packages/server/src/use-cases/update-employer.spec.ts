import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'
import { UpdateEmployerUseCase } from './update-employer'
import { EmployerNotFoundError } from './errors/employer-not-found'

let employerRepository: InMemoryEmployersRepository
let sut: UpdateEmployerUseCase

describe('Get Employers By Name Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    sut = new UpdateEmployerUseCase(employerRepository)
  })

  it('should be able to find employers by name range', async () => {
    const employerOne = await employerRepository.create({
      name: 'doe',
      birthdate: new Date(2022, 7, 14),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const { employer } = await sut.execute({
      id: employerOne.id,
      name: 'johndoe',
      birthdate: new Date(2022, 7, 14),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    expect(employer.name).toEqual('johndoe')
  })

  it('should not be able to update employer what not exists', async () => {
    await expect(() =>
      sut.execute({
        id: 'employerOne.id',
        name: 'johndoe',
        birthdate: new Date(2022, 7, 14),
        email: 'johndoe@email.com',
        gender: 'MALE',
      }),
    ).rejects.toBeInstanceOf(EmployerNotFoundError)
  })
})
