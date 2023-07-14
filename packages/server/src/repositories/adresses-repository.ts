import { Prisma, Address } from '@prisma/client'

export interface AddressesRepository {
  getAdressesByEmployerId(employerId: string): Promise<Address[] | null>
  create(data: Prisma.AddressCreateInput, employerId?: string): Promise<Address>
  update(data: Prisma.AddressUpdateInput): Promise<Address | undefined>
}
