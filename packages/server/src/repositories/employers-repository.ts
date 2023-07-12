import { Prisma, Employer } from '@prisma/client'

export interface EmployerRepository {
  findByBirthDateRange(
    initialBirthDate: string,
    finalBirthDate: string,
  ): Promise<Employer[] | null>
  findByName(name: string): Promise<Employer[] | null>
  findById(employerId: string): Promise<Employer | null>
  create(data: Prisma.EmployerCreateInput): Promise<Employer>
  update(data: Prisma.EmployerUpdateInput): Promise<Employer>
}
