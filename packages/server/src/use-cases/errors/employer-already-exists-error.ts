export class EmployerAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
