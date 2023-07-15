import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetAllEmployersUseCase } from '@/use-cases/factories/make-get-all-employers-use-case'

export async function getAllEmployers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllEmployersUseCase = makeGetAllEmployersUseCase()

  const { employers } = await getAllEmployersUseCase.execute()

  return reply.status(200).send({
    employers,
  })
}
