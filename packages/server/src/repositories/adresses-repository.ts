import { Prisma, Address } from '@prisma/client'

export interface AddressesRepository {
  getAdressesByEmployerId(employerId: string): Promise<Address[] | null>
  create(
    data: Prisma.AddressUncheckedCreateInput,
    employerId?: string,
  ): Promise<Address>
  update(data: Prisma.AddressUncheckedUpdateInput): Promise<Address | undefined>
}
