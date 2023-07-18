import React from 'react'
import { Roboto } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import Head from 'next/head'

import Modal from 'react-modal'

import { globalStyles } from '../styles/global'

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { AppProvider } from '@/hooks'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-roboto',
})

globalStyles()

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <SessionProvider session={session}>
      <AppProvider>
        <Head>
          <title>Eddydata</title>
        </Head>
        <main className={`${roboto.className}`} id="modals">
          <Component {...pageProps} />
        </main>
      </AppProvider>
    </SessionProvider>,
  )
}
