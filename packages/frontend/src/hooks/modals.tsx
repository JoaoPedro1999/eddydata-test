import React, { createContext, useState, useContext, ReactNode } from 'react'

interface ModalProviderProps {
  children: ReactNode | ReactNode[]
}

interface ModalContextData {
  modalRegisterEmployerIsOpen: boolean
  modalRegisterRemunerationIsOpen: boolean
  toggleRegisterEmployerModal: () => void
  toggleRegisterRemunerationModal: () => void
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalRegisterEmployerIsOpen, setModalRegisterEmployerIsOpen] =
    useState(false)
  const [modalRegisterRemunerationIsOpen, setModalRegisterRemunerationIsOpen] =
    useState(false)

  function toggleRegisterEmployerModal() {
    setModalRegisterEmployerIsOpen((prevState) => !prevState)
  }

  function toggleRegisterRemunerationModal() {
    setModalRegisterRemunerationIsOpen((prevState) => !prevState)
  }

  return (
    <ModalContext.Provider
      value={{
        modalRegisterEmployerIsOpen,
        modalRegisterRemunerationIsOpen,
        toggleRegisterEmployerModal,
        toggleRegisterRemunerationModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextData {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used with an ModalProvider')
  }

  return context
}
