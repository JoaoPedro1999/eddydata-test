import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetRemunerationsByEmployerIdUseCase } from '@/use-cases/factories/make-get-remunerations-by-employer-id-use-case'
import { EmployerNotFoundError } from '@/use-cases/errors/employer-not-found'
import { z } from 'zod'

export async function getRemunerationsByEmployerId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getRemunerationsByEmployerIdQueySchema = z
    .object({
      employerId: z.string(),
    })
    .required()

  const { employerId } = getRemunerationsByEmployerIdQueySchema.parse(
    request.params,
  )

  try {
    const getRemunerationsByEmployerIdUseCase =
      makeGetRemunerationsByEmployerIdUseCase()

    const { remunerations } = await getRemunerationsByEmployerIdUseCase.execute(
      employerId,
    )

    return reply.status(200).send({
      remunerations,
    })
  } catch (err) {
    if (err instanceof EmployerNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
