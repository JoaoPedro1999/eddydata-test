import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'
import { InMemoryRemunerationsRepository } from '@/repositories/in-memory/in-memory-remuneration-repository'

import { UpdateRemunerationUseCase } from './update-remuneration'
import { EmployerNotFoundError } from './errors/employer-not-found'

let employerRepository: InMemoryEmployersRepository
let remunerationsRepository: InMemoryRemunerationsRepository

let sut: UpdateRemunerationUseCase

describe('Create Remuneration Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    remunerationsRepository = new InMemoryRemunerationsRepository()
    sut = new UpdateRemunerationUseCase(
      remunerationsRepository,
      employerRepository,
    )
  })

  it('should to update remuneration', async () => {
    const employer = await employerRepository.create({
      name: 'johndoe',
      birthdate: new Date(),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    const remunerationOne = await remunerationsRepository.create({
      remuneration_type: 'BANK_TRANSFER',
      payday: new Date(),
      remuneration_value: 1000,
      employer_id: employer.id,
    })

    const { remuneration } = await sut.execute({
      remunerationId: remunerationOne.id,
      employerId: employer.id,
      payday: new Date(),
      remuneration_type: 'MONEY',
      remuneration_value: 1000,
    })

    expect(remuneration.remuneration_type).toEqual('MONEY')
  })

  it('should not be able update remuneration when employer not exists', async () => {
    await expect(() =>
      sut.execute({
        employerId: 'non-exists',
        payday: new Date(),
        remuneration_type: 'BANK_TRANSFER',
        remuneration_value: 1000,
        remunerationId: 'non-exists',
      }),
    ).rejects.toBeInstanceOf(EmployerNotFoundError)
  })
})
