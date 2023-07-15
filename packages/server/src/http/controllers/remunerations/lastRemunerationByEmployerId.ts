import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetLastRemunerationByEmployerIdUseCase } from '@/use-cases/factories/make-get-last-remuneration-by-employer-id-use-cas'
import { EmployerNotFoundError } from '@/use-cases/errors/employer-not-found'

export async function lastRemunerationByEmployerId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  try {
    const getLastRemunerationByEmployerIdUseCase =
      makeGetLastRemunerationByEmployerIdUseCase()

    const remuneration = await getLastRemunerationByEmployerIdUseCase.execute(
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
