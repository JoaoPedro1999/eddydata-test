export class EmployerNotFoundError extends Error {
  constructor() {
    super('Employer not found!')
  }
}
