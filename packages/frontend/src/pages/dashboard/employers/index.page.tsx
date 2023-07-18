import React, { ReactElement, useEffect, useState } from 'react'

import { Button, Heading } from '@buma-ui/react-components'

import { Plus, Trash, Pen } from '@phosphor-icons/react'

import { useSession } from 'next-auth/react'

import DashboardLayout from '../layout'

import {
  Container,
  Header,
  Content,
  Employer,
  EmployerActionButton,
  EmployerActions,
  EmployerHeading,
} from './styles'

import { RegisterEmployer } from './components/RegisterEmployer'

import type {
  Employer as EmployerType,
  EmployerResponse,
} from '@/@types/global'

import { useModal } from '@/hooks/modals'

import { api } from '@/lib/api'

export default function Employers() {
  const { toggleRegisterEmployerModal } = useModal()

  const [employers, setEmployers] = useState<EmployerType[] | undefined>([])

  const { data } = useSession()

  useEffect(() => {
    if (data?.user.accessToken) {
      api.get<EmployerResponse>('/employers').then(({ data }) => {
        setEmployers(data.employers)
      })
    }
  }, [data?.user.accessToken])

  return (
    <>
      <Container>
        <Header>
          <Heading>Colaboradores</Heading>

          <Button type="button" onClick={toggleRegisterEmployerModal}>
            <Plus />
            Adicionar Colaborador
          </Button>
        </Header>

        <Content>
          {employers &&
            employers.map((employer) => {
              return (
                <Employer key={employer.id}>
                  <EmployerHeading href={`/dashboard/employers/${employer.id}`}>
                    {employer.name}
                  </EmployerHeading>

                  <EmployerActions>
                    <EmployerActionButton type="button" options={'normal'}>
                      <Pen />
                    </EmployerActionButton>
                    <EmployerActionButton type="button" options={'attention'}>
                      <Trash />
                    </EmployerActionButton>
                  </EmployerActions>
                </Employer>
              )
            })}
        </Content>
      </Container>
      <RegisterEmployer />
    </>
  )
}

Employers.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}
