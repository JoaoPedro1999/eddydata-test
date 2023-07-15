import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetRemunerationSumByRemunerationTypeUseCase } from '@/use-cases/factories/make-get-remuneration-sum-by-remuneration-type-use-case'

export async function remunerationsSumByRemunerationType(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getRemunerationSumByRemunerationTypeUseCase =
    makeGetRemunerationSumByRemunerationTypeUseCase()

  const { remunerations } =
    await getRemunerationSumByRemunerationTypeUseCase.execute()

  return reply.status(200).send({
    remunerations,
  })
}
