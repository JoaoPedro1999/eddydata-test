import { getSession } from 'next-auth/react'

import { useEffect } from 'react'

import { SidebarMenu } from '@/components/SidebarMenu'
import { AppProvider } from '@/hooks'
import { api } from '@/lib/api'
import { useDevice } from '@/utils/useDevice'
import { FooterMenu } from '@/components/FooterMenu'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { device } = useDevice()

  useEffect(() => {
    getSession().then((response) => {
      api.defaults.headers.common.Authorization = `Bearer ${response?.user.accessToken}`
    })
  }, [])

  return (
    <>
      <AppProvider>
        {device === 'tablet' || device === 'mobile' ? (
          <FooterMenu />
        ) : (
          <SidebarMenu />
        )}

        {children}
      </AppProvider>
    </>
  )
}
