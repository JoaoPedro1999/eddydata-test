import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'
import { InMemoryRemunerationsRepository } from '@/repositories/in-memory/in-memory-remuneration-repository'

import { CreateRemunerationUseCase } from './create-remuneration'
import { EmployerNotFoundError } from './errors/employer-not-found'

let employerRepository: InMemoryEmployersRepository
let remunerationsRepository: InMemoryRemunerationsRepository

let sut: CreateRemunerationUseCase

describe('Create Remuneration Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    remunerationsRepository = new InMemoryRemunerationsRepository()
    sut = new CreateRemunerationUseCase(
      remunerationsRepository,
      employerRepository,
    )
  })

  it('should to create remuneration', async () => {
    const employer = await employerRepository.create({
      name: 'johndoe',
      birthdate: new Date(),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const { remuneration } = await sut.execute({
      employerId: employer.id,
      payday: new Date(),
      remuneration_type: 'BANK_TRANSFER',
      remuneration_value: 1000,
    })

    expect(remuneration.id).toEqual(expect.any(String))
  })

  it('should to create remuneration', async () => {
    await expect(() =>
      sut.execute({
        employerId: 'non-exists',
        payday: new Date(),
        remuneration_type: 'BANK_TRANSFER',
        remuneration_value: 1000,
      }),
    ).rejects.toBeInstanceOf(EmployerNotFoundError)
  })
})
