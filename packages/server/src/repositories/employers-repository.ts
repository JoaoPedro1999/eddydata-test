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
  findAllEmployers(): Promise<Employer[]>
  create(data: Prisma.EmployerUncheckedCreateInput): Promise<Employer>
  update(data: Prisma.EmployerUncheckedUpdateInput): Promise<Employer>
  delete(employerId: string): Promise<void>
}
