import axios from 'axios'
import { getSession } from 'next-auth/react'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})
