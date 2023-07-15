import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'

import { GetAllEmployersUseCase } from './get-all-employers'

let employerRepository: InMemoryEmployersRepository

let sut: GetAllEmployersUseCase

describe('Get All Employers Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    sut = new GetAllEmployersUseCase(employerRepository)
  })

  it('should to be able to find all employers', async () => {
    const employerOne = await employerRepository.create({
      name: 'johndoe',
      birthdate: new Date(),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const employerTwo = await employerRepository.create({
      name: 'johndoe',
      birthdate: new Date(),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const { employers } = await sut.execute()

    expect(employers).toEqual([employerOne, employerTwo])
  })
})
