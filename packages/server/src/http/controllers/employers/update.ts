import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateEmployerUseCase } from '@/use-cases/factories/make-update-employer-use-case'
import { z } from 'zod'
import { EmployerNotFoundError } from '@/use-cases/errors/employer-not-found'
import { GenderType } from '@prisma/client'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    birthdate: z.string(),
    email: z.string().email(),
    gender: z.string(),
    name: z.string(),
  })

  const updateParamsSchema = z.object({
    employerId: z.string(),
  })

  const { birthdate, email, gender, name } = updateBodySchema.parse(
    request.body,
  )

  const { employerId } = updateParamsSchema.parse(request.params)

  try {
    const updateUseCase = makeUpdateEmployerUseCase()

    await updateUseCase.execute({
      birthdate,
      email,
      gender: gender as GenderType,
      name,
      id: employerId,
    })
  } catch (err) {
    if (err instanceof EmployerNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
