import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetEmployersByBirthdateRangeUseCase } from '@/use-cases/factories/make-get-employers-by-birthdate-range-use-case'
import { z } from 'zod'

export async function getEmployersByBirthDateRange(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEmployersByBirthDateRangeQueySchema = z
    .object({
      initialBirthDate: z.string(),
      finalBirthDate: z.string(),
    })
    .required()

  const { finalBirthDate, initialBirthDate } =
    getEmployersByBirthDateRangeQueySchema.parse(request.query)

  const getEmployersByBirthdateRangeUseCase =
    makeGetEmployersByBirthdateRangeUseCase()

  const { employers } = await getEmployersByBirthdateRangeUseCase.execute({
    initialBirthDate,
    finalBirthDate,
  })

  return reply.status(200).send({
    employers,
  })
}
