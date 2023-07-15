import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetEmployersByIdUseCase } from '@/use-cases/factories/make-get-employers-by-id-use-case'
import { z } from 'zod'

export async function getEmployersById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEmployersByNameQueySchema = z
    .object({
      employerId: z.string(),
    })
    .required()

  const { employerId } = getEmployersByNameQueySchema.parse(request.params)

  const getEmployersByIdUseCase = makeGetEmployersByIdUseCase()

  const { employer } = await getEmployersByIdUseCase.execute({
    employerId,
  })

  return reply.status(200).send({
    employer,
  })
}
