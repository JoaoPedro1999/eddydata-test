import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'
import { InMemoryRemunerationsRepository } from '@/repositories/in-memory/in-memory-remuneration-repository'

import { GetRemunerationsByEmployerIdUseCase } from './get-remunerations-by-employer-id'
import { EmployerNotFoundError } from './errors/employer-not-found'

let employerRepository: InMemoryEmployersRepository
let remunerationsRepository: InMemoryRemunerationsRepository
let sut: GetRemunerationsByEmployerIdUseCase

describe('Get Remunerations By Employer Id Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    remunerationsRepository = new InMemoryRemunerationsRepository()
    sut = new GetRemunerationsByEmployerIdUseCase(
      remunerationsRepository,
      employerRepository,
    )
  })

  it('should be able to find employers by name range', async () => {
    const employer = await employerRepository.create({
      name: 'doe',
      birthdate: new Date(2022, 7, 14),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const remunerationOne = await remunerationsRepository.create(
      {
        employer: employer as any,
        payday: new Date(),
        remuneration_value: 1000,
        remuneration_type: 'BANK_TRANSFER',
      },
      employer.id,
    )

    const remunerationTwo = await remunerationsRepository.create(
      {
        employer: employer as any,
        payday: new Date(),
        remuneration_value: 1000,
        remuneration_type: 'BANK_TRANSFER',
      },
      employer.id,
    )

    const { remunerations } = await sut.execute(employer.id)

    expect(remunerations).toEqual([remunerationOne, remunerationTwo])
  })

  it('should not be able to find last remuneration of employer what not exists', async () => {
    await expect(() => sut.execute('non-exists')).rejects.toBeInstanceOf(
      EmployerNotFoundError,
    )
  })
})
