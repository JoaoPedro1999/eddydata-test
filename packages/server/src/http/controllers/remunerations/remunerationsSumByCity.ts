import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetRemunerationSumByCityUseCase } from '@/use-cases/factories/make-get-remuneration-sum-by-city-use-case'

export async function remunerationsSumByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getRemunerationSumByCityUseCase = makeGetRemunerationSumByCityUseCase()

  const { remunerations } = await getRemunerationSumByCityUseCase.execute()

  return reply.status(200).send({
    remunerations,
  })
}
