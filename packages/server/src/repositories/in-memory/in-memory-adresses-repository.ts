/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Address, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { AddressesRepository } from '@/repositories/adresses-repository'

export class InMemoryAdressessRepository implements AddressesRepository {
  public items: Address[] = []

  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: randomUUID(),
      postal_code: data.postal_code,
      street_address: data.street_address,
      number: data.number,
      complement: null,
      city: data.city,
      country: data.country,
      employer_id: data.employer_id,
      created_at: new Date(),
    }

    this.items.push(address)

    return address
  }

  async update(data: Prisma.AddressUncheckedUpdateInput) {
    const findIndex = this.items.findIndex((item) => item.id === data.id)

    const address = {
      id: randomUUID(),
      postal_code: String(data.postal_code),
      street_address: String(data.street_address),
      number: String(data.number),
      complement: String(data.complement),
      city: String(data.city),
      country: String(data.country),
      created_at: new Date(String(data.created_at)),
      employer_id: String(data.employer_id),
    }

    this.items[findIndex] = address

    return address
  }

  async getAdressesByEmployerId(employerId: string) {
    const adresses = this.items.filter(
      (item) => item.employer_id === employerId,
    )

    return adresses
  }
}
