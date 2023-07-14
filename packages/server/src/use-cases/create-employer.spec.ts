import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployersRepository } from '@/repositories/in-memory/in-memory-employers-repository'
import { CreateEmployerUseCase } from './create-employer'
import { InMemoryAdressessRepository } from '@/repositories/in-memory/in-memory-adresses-repository'
import { EmployerAlreadyExistsError } from './errors/employer-already-exists-error'

let employerRepository: InMemoryEmployersRepository
let adressesRepository: InMemoryAdressessRepository

let sut: CreateEmployerUseCase

describe('Create Employer Use Case', () => {
  beforeEach(() => {
    employerRepository = new InMemoryEmployersRepository()
    adressesRepository = new InMemoryAdressessRepository()
    sut = new CreateEmployerUseCase(employerRepository, adressesRepository)
  })

  it('should to create employer', async () => {
    const { employer } = await sut.execute({
      name: 'johndoe',
      birthdate: new Date(),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    expect(employer.id).toEqual(expect.any(String))
  })

  it('should to register employer with address', async () => {
    const { employer } = await sut.execute({
      name: 'johndoe',
      birthdate: new Date(),
      email: 'johndoe@email.com',
      gender: 'MALE',
      city: 'Franca',
      country: 'Brazil',
      postal_code: '14403105',
      number: '195',
      street_address: 'Rua',
    })

    const address = await adressesRepository.getAdressesByEmployerId(
      employer.id,
    )

    expect(address[0].employer_id).toEqual(employer.id)
  })

  it('should not be able to create employer with exists email', async () => {
    await sut.execute({
      name: 'johndoe',
      birthdate: new Date(),
      email: 'johndoe@email.com',
      gender: 'MALE',
    })

    await expect(() =>
      sut.execute({
        name: 'johndoe',
        birthdate: new Date(),
        email: 'johndoe@email.com',
        gender: 'MALE',
      }),
    ).rejects.toBeInstanceOf(EmployerAlreadyExistsError)
  })
})
