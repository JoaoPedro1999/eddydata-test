import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'
import { GetEmployersByBirthdateRangeUseCase } from './get-employers-by-birthdate-range'

let employerRepository: InMemoryEmployersRepository
let sut: GetEmployersByBirthdateRangeUseCase

describe('Get Employers By Birthdate Range Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    sut = new GetEmployersByBirthdateRangeUseCase(employerRepository)
  })

  it('should be able to find employers by birthdate range', async () => {
    await employerRepository.create({
      name: 'johndoe',
      birthdate: new Date(2022, 7, 14),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const employerTwo = await employerRepository.create({
      name: 'johndoe',
      birthdate: new Date(2023, 7, 14),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const { employers } = await sut.execute({
      finalBirthDate: new Date(2023, 8, 14),
      initialBirthDate: new Date(2023, 6, 14),
    })

    expect(employers).toEqual([employerTwo])
  })
})
