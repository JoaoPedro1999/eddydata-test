import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateRemunerationUseCase } from '@/use-cases/factories/make-update-remuneration-use-case'
import { RemunerationType } from '@prisma/client'
import { EmployerNotFoundError } from '@/use-cases/errors/employer-not-found'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    payday: z.date(),
    remuneration_type: z.string(),
    remuneration_value: z.string(),
    employerId: z.string().uuid(),
  })

  const updateParamsSchema = z.object({
    remunerationId: z.string(),
  })

  const { payday, remuneration_type, remuneration_value, employerId } =
    updateBodySchema.parse(request.body)

  const { remunerationId } = updateParamsSchema.parse(request.params)

  try {
    const updateRemunerationUseCase = makeUpdateRemunerationUseCase()

    await updateRemunerationUseCase.execute({
      employerId,
      payday,
      remuneration_type: remuneration_type as RemunerationType,
      remuneration_value,
      remunerationId,
    })
  } catch (err) {
    if (err instanceof EmployerNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
