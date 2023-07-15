import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { getAllEmployers } from './getAllEmployers'
import { getEmployersByBirthDateRange } from './getEmployersByBirthDateRange'
import { getEmployersByName } from './getEmployersByName'
import { getEmployersById } from './getEmployersById'

import { create } from './create'
import { remove } from './remove'
import { update } from './update'

export async function employersRoutes(app: FastifyInstance) {
  app.get('/employers', { onRequest: [verifyJwt] }, getAllEmployers)
  app.get(
    '/employers/birthdate_range',
    { onRequest: [verifyJwt] },
    getEmployersByBirthDateRange,
  )
  app.get('/employers/name', { onRequest: [verifyJwt] }, getEmployersByName)
  app.get(
    '/employers/:employerId',
    { onRequest: [verifyJwt] },
    getEmployersById,
  )

  app.post('/employers', { onRequest: [verifyJwt] }, create)
  app.put('/employers/:employerId', { onRequest: [verifyJwt] }, update)
  app.delete('/employers/:employerId', { onRequest: [verifyJwt] }, remove)
}
