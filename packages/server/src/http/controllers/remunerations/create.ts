import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateRemunerationUseCase } from '@/use-cases/factories/make-create-remuneration-use-case'
import { RemunerationType } from '@prisma/client'
import { EmployerNotFoundError } from '@/use-cases/errors/employer-not-found'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z
    .object({
      employerId: z.string(),
      payday: z.string(),
      remuneration_type: z.string(),
      remuneration_value: z.number(),
    })
    .required()

  const { employerId, payday, remuneration_type, remuneration_value } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeCreateRemunerationUseCase()

    await registerUseCase.execute({
      employerId,
      payday,
      remuneration_type: remuneration_type as RemunerationType,
      remuneration_value,
    })
  } catch (err) {
    if (err instanceof EmployerNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
