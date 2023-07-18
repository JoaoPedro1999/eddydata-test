import React from 'react'

import { MenuProvider } from './menu'
import { ModalProvider } from './modals'

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <MenuProvider>
    <ModalProvider>{children}</ModalProvider>
  </MenuProvider>
)
