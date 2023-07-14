import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'
import { expect, describe, it, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const user = await usersRepository.create({
      email: 'nome@email.com',
      password_hash: 'hausihsauidias',
    })

    const { user: profie } = await sut.execute({
      userId: user.id,
    })

    expect(profie.email).toEqual('nome@email.com')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
