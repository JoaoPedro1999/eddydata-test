import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetEmployersByNameUseCase } from '@/use-cases/factories/make-get-employers-by-name-use-case'
import { z } from 'zod'

export async function getEmployersByName(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEmployersByNameQueySchema = z
    .object({
      name: z.string(),
    })
    .required()

  const { name } = getEmployersByNameQueySchema.parse(request.query)

  const getEmployersByNameUseCase = makeGetEmployersByNameUseCase()

  const { employers } = await getEmployersByNameUseCase.execute({
    name,
  })

  return reply.status(200).send({
    employers,
  })
}
