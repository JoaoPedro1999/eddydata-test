import { Prisma, Employer } from '@prisma/client'

export interface EmployerRepository {
  findByBirthDateRange(
    initialBirthDate: Date | string,
    finalBirthDate: Date | string,
  ): Promise<Employer[]>
  findByName(name: string): Promise<Employer[]>
  findById(employerId: string): Promise<Employer | null>
  findByEmail(email: string): Promise<Employer | null>
  findByUserId(userId: string): Promise<Employer | null>
  create(data: Prisma.EmployerCreateInput): Promise<Employer>
  update(data: Prisma.EmployerUpdateInput): Promise<Employer>
  delete(employerId: string): Promise<void>
}
