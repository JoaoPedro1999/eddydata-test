import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetLastRemunerationByEmployerIdUseCase } from '@/use-cases/factories/make-get-last-remuneration-by-employer-id-use-cas'
import { EmployerNotFoundError } from '@/use-cases/errors/employer-not-found'
import { z } from 'zod'

export async function lastRemunerationByEmployerId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const lastRemunerationByEmployerIdQueySchema = z
    .object({
      employerId: z.string(),
    })
    .required()

  const { employerId } = lastRemunerationByEmployerIdQueySchema.parse(
    request.params,
  )

  try {
    const getLastRemunerationByEmployerIdUseCase =
      makeGetLastRemunerationByEmployerIdUseCase()

    const remuneration = await getLastRemunerationByEmployerIdUseCase.execute(
      employerId,
    )

    return reply.status(200).send({
      remuneration,
    })
  } catch (err) {
    if (err instanceof EmployerNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
