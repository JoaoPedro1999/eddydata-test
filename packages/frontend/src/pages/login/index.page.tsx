import { TextInput, Heading, Text, Button } from '@buma-ui/react-components'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import { signIn, getCsrfToken, useSession } from 'next-auth/react'

import { useRouter } from 'next/router'

import { getServerSession } from 'next-auth'

import NextauthApi from '../api/auth/[...nextauth].api'

import { Container, Form, FormError, Header } from './styles'

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Digite um email valido' }),
  password: z
    .string()
    .min(3, { message: 'A senha precisa ter ao menos 3 caracteres' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function Login({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  const { push } = useRouter()

  async function handleRegister(data: LoginFormData) {
    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      push('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao EddyRH</Heading>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            <Text size="sm">Email</Text>
            <TextInput
              placeholder="example@email.com"
              {...register('email')}
              type="email"
            />
            {errors.email && (
              <FormError size="sm">{errors.email?.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Senha</Text>
            <TextInput type="password" {...register('password')} />
            {errors.password && (
              <FormError size="sm">{errors.password?.message}</FormError>
            )}
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Entrar
          </Button>
        </Form>
      </Header>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, NextauthApi)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
      csrfToken: await getCsrfToken(context),
    },
  }
}
