import React, { ReactElement, useEffect, useState } from 'react'

import { Heading } from '@buma-ui/react-components'

import DashboardLayout from './layout'
import {
  Container,
  Content,
  Header,
  InformationContent,
  InformationHeader,
} from './styles'

import { formatValue } from '@/utils/formatValue'
import { api } from '@/lib/api'
import {
  RemunerationByCity,
  RemunerationByCityResponse,
  RemunerationByGender,
  RemunerationByGenderResponse,
  RemunerationByRemunerationType,
  RemunerationByRemunerationTypeResponse,
} from '@/@types/global'

export default function Dashboard() {
  const [remunerationByGender, setRemunerationByGender] = useState<
    RemunerationByGender[]
  >([])
  const [remunerationByRemunerationType, setRemunerationByRemunerationType] =
    useState<RemunerationByRemunerationType[]>([])
  const [remunerationByCity, setRemunerationByCity] = useState<
    RemunerationByCity[]
  >([])

  useEffect(() => {
    api
      .get<RemunerationByCityResponse>('/remuneration/sum_by_city')
      .then(({ data }) => setRemunerationByCity(data.remunerations))

    api
      .get<RemunerationByRemunerationTypeResponse>(
        '/remuneration/sum_by_remuneration_type',
      )
      .then(({ data }) => {
        const formmatedResponse = data.remunerations.map((item) => {
          return {
            ...item,
            remuneration_type:
              item.remuneration_type === 'MONEY'
                ? 'Dinheiro'
                : 'Transferência bancária',
          }
        })
        setRemunerationByRemunerationType(formmatedResponse)
      })

    api
      .get<RemunerationByGenderResponse>('/remuneration/sum_by_gender')
      .then(({ data }) => {
        const formmatedResponse = data.remunerations.map((item) => {
          return {
            ...item,
            gender: item.gender === 'MALE' ? 'Masculino' : 'Feminino',
          }
        })

        setRemunerationByGender(formmatedResponse)
      })
  }, [])

  return (
    <Container>
      <Header>
        <Heading>Remuneração por Cidade</Heading>
      </Header>

      <Content>
        {remunerationByCity.map((item) => (
          <>
            <InformationHeader key={item.city}>
              <Heading as="span">Cidade</Heading>
              <Heading as="span">Valor Total</Heading>
            </InformationHeader>
            <InformationContent>
              <Heading as="span">{item.city}</Heading>

              <Heading as="span">{formatValue(Number(item.sum))}</Heading>
            </InformationContent>
          </>
        ))}
      </Content>

      <Header>
        <Heading>Remuneração por Gênero</Heading>
      </Header>

      <Content>
        {remunerationByGender.map((item) => (
          <>
            <InformationHeader key={item.gender}>
              <Heading as="span">Gênero</Heading>
              <Heading as="span">Valor Total</Heading>
            </InformationHeader>
            <InformationContent>
              <Heading as="span">{item.gender}</Heading>

              <Heading as="span">{formatValue(Number(item.sum))}</Heading>
            </InformationContent>
          </>
        ))}
      </Content>

      <Header>
        <Heading>Remuneração por Tipo de Remuneração</Heading>
      </Header>

      <Content>
        <InformationHeader>
          <Heading as="span">Tipo de Remuneração</Heading>
          <Heading as="span">Valor Total</Heading>
        </InformationHeader>
        {remunerationByRemunerationType.map((item) => (
          <>
            <InformationContent key={item.remuneration_type}>
              <Heading as="span">{item.remuneration_type}</Heading>

              <Heading as="span">
                {formatValue(Number(item._sum.remuneration_value))}
              </Heading>
            </InformationContent>
          </>
        ))}
      </Content>
    </Container>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}
