import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { update } from './update'
import { remunerationsSumByCity } from './remunerationsSumByCity'
import { remunerationsSumByGender } from './remunerationsSumByGender'
import { remunerationsSumByRemunerationType } from './remunerationsSumByRemunerationType'
import { lastRemunerationByEmployerId } from './lastRemunerationByEmployerId'
import { getRemunerationsByEmployerId } from './getRemunerationsByEmployerId'

export async function remunerationsRoutes(app: FastifyInstance) {
  app.get(
    '/remuneration/sum_by_city',
    { onRequest: [verifyJwt] },
    remunerationsSumByCity,
  )
  app.get(
    '/remuneration/sum_by_gender',
    { onRequest: [verifyJwt] },
    remunerationsSumByGender,
  )
  app.get(
    '/remuneration/sum_by_remuneration_type',
    { onRequest: [verifyJwt] },
    remunerationsSumByRemunerationType,
  )
  app.get(
    '/remuneration/last_remuneration/:employerId',
    { onRequest: [verifyJwt] },
    lastRemunerationByEmployerId,
  )

  app.get(
    '/remuneration/all/:employerId',
    { onRequest: [verifyJwt] },
    getRemunerationsByEmployerId,
  )

  app.post('/remuneration', { onRequest: [verifyJwt] }, create)
  app.put('/remuneration/:remunerationId', { onRequest: [verifyJwt] }, update)
}
