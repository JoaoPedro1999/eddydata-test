import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateEmployerUseCase } from '@/use-cases/factories/make-create-employer-use-case'
import { GenderType } from '@prisma/client'

import { EmployerAlreadyExistsError } from '@/use-cases/errors/employer-already-exists-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    birthdate: z.string(),
    email: z.string().email(),
    gender: z.string(),
    name: z.string(),
    city: z.string(),
    complement: z.string(),
    country: z.string(),
    number: z.string(),
    postal_code: z.string(),
    street_address: z.string(),
  })

  const {
    birthdate,
    city,
    complement,
    country,
    email,
    gender,
    name,
    number,
    postal_code,
    street_address,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeCreateEmployerUseCase()

    await registerUseCase.execute({
      birthdate,
      email,
      gender: gender as GenderType,
      name,
      city,
      complement,
      country,
      number,
      postal_code,
      street_address,
    })
  } catch (err) {
    if (err instanceof EmployerAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
