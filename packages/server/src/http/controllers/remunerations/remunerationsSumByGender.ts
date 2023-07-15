import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateRemunerationUseCase } from '@/use-cases/factories/make-get-remuneration-sum-by-gender-use-case'

export async function remunerationsSumByGender(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getRemunerationSumByGenderUseCase = makeCreateRemunerationUseCase()

  const { remunerations } = await getRemunerationSumByGenderUseCase.execute()

  return reply.status(200).send({
    remunerations,
  })
}
