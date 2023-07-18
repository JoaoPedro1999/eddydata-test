import React, { ReactElement, useEffect, useState } from 'react'
import { Button, Heading } from '@buma-ui/react-components'
import { Plus } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import {
  Container,
  Header,
  Content,
  RemunerationsHeader,
  RemunerationsContent,
} from './styles'

import { RegisterRemuneration } from './components/RegisterRemuneration'

import { useModal } from '@/hooks/modals'

import DashboardLayout from '@/pages/dashboard/layout'

import { api } from '@/lib/api'
import { Employer, Remuneration, RemunerationResponse } from '@/@types/global'
import { formatValue } from '@/utils/formatValue'

export default function Employer() {
  const [remunerations, setRemunerations] = useState<Remuneration[]>([])
  const [employer, setEmployer] = useState<Employer>({} as Employer)

  const { toggleRegisterRemunerationModal } = useModal()

  const { data } = useSession()
  const { query } = useRouter()

  useEffect(() => {
    if (data?.user.accessToken && query.id) {
      api
        .get<RemunerationResponse>(`/remuneration/all/${query.id}`)
        .then(({ data }) => {
          const formmatedData = data.remunerations.map((remuneration) => {
            return {
              ...remuneration,
              remuneration_type:
                remuneration.remuneration_type === 'BANK_TRANSFER'
                  ? 'Transferência Bancaria'
                  : 'Dinheiro',
            }
          })
          setRemunerations(formmatedData)
        })

      api.get(`/employers/${query.id}`).then(({ data }) => {
        console.log('data', data)
        setEmployer(data.employer)
      })
    }
  }, [data?.user.accessToken, query])

  return (
    <>
      <Container>
        <Header>
          <Heading>{employer.name}</Heading>

          <Button type="button" onClick={toggleRegisterRemunerationModal}>
            <Plus />
            Adicionar Remuneração
          </Button>
        </Header>

        <Content>
          <RemunerationsHeader>
            <Heading as="span">Ref.</Heading>
            <Heading as="span">Tipo</Heading>
            <Heading as="span">Pagamento</Heading>
            <Heading as="span">Liquido</Heading>
          </RemunerationsHeader>

          {remunerations.map((remuneration) => (
            <RemunerationsContent key={remuneration.id}>
              <Heading as="span">
                {format(new Date(remuneration.payday), 'LLL', {
                  locale: ptBR,
                })}
              </Heading>
              <Heading as="span">{remuneration.remuneration_type}</Heading>
              <Heading as="span">
                {format(new Date(remuneration.payday), 'dd/MM/yyyy', {
                  locale: ptBR,
                })}
              </Heading>
              <Heading as="span">
                {formatValue(Number(remuneration.remuneration_value))}
              </Heading>
            </RemunerationsContent>
          ))}
        </Content>
      </Container>
      <RegisterRemuneration />
    </>
  )
}

Employer.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}
