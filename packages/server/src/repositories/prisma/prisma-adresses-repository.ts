import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { AddressesRepository } from '../adresses-repository'

export class PrismaAdressesRepository implements AddressesRepository {
  async create(data: Prisma.AddressCreateInput) {
    const address = await prisma.address.create({
      data,
    })

    return address
  }

  async update(data: Prisma.AddressUpdateInput) {
    const address = await prisma.address.update({
      where: {
        id: String(data.id),
      },
      data,
    })

    return address
  }

  async getAdressesByEmployerId(employerId: string) {
    const adresses = await prisma.address.findMany({
      where: {
        employer_id: employerId,
      },
    })

    return adresses
  }
}
