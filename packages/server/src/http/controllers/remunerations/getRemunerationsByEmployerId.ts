import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetRemunerationsByEmployerIdUseCase } from '@/use-cases/factories/make-get-remunerations-by-employer-id-use-case'
import { EmployerNotFoundError } from '@/use-cases/errors/employer-not-found'

export async function getRemunerationsByEmployerId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  try {
    const getRemunerationsByEmployerIdUseCase =
      makeGetRemunerationsByEmployerIdUseCase()

    const remuneration = await getRemunerationsByEmployerIdUseCase.execute(
      userId,
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
