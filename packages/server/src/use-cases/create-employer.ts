import { EmployerRepository } from '@/repositories/employers-repository'
import { Employer } from '@prisma/client'
import { EmployerAlreadyExistsError } from './errors/employer-already-exists-error'
import { AddressesRepository } from '@/repositories/adresses-repository'

interface CreateEmployerUseCaseRequest {
  birthdate: string
  email: string
  name: string
  gender: 'MALE' | 'FEMALE'

  city?: string
  country?: string
  number?: string
  postal_code?: string
  street_address?: string
  complement?: string
}

interface CreateEmployerUseCaseResponse {
  employer: Employer
}

export class CreateEmployerUseCase {
  constructor(
    private employersRepository: EmployerRepository,
    private addressRepository: AddressesRepository,
  ) {}

  async execute({
    birthdate,
    email,
    gender,
    name,
    city,
    complement,
    country,
    number,
    postal_code,
    street_address,
  }: CreateEmployerUseCaseRequest): Promise<CreateEmployerUseCaseResponse> {
    const findEmployer = await this.employersRepository.findByEmail(email)

    if (findEmployer) {
      throw new EmployerAlreadyExistsError()
    }

    const employer = await this.employersRepository.create({
      birthdate,
      email,
      gender,
      name,
    })

    if (city && country && number && postal_code && street_address) {
      await this.addressRepository.create({
        city,
        country,
        employer_id: employer.id,
        number,
        postal_code,
        street_address,
        complement,
      })
    }

    return { employer }
  }
}
