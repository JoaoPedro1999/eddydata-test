import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteEmployerUseCase } from '@/use-cases/factories/make-delete-employer-use-case'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const getEmployersByNameQueySchema = z
    .object({
      employerId: z.string(),
    })
    .required()

  const { employerId } = getEmployersByNameQueySchema.parse(request.params)

  const getEmployersByIdUseCase = makeDeleteEmployerUseCase()

  await getEmployersByIdUseCase.execute({ employerId })

  return reply.status(201).send()
}
