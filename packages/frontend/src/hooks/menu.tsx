import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react'

interface MenuProviderProps {
  children: ReactNode | ReactNode[]
}

interface MenuContextData {
  menuIsOpen: boolean
  toggleSliderMenu: () => void
  closeSliderMenu: () => void
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData)

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const toggleSliderMenu = useCallback(() => {
    setMenuIsOpen(true)
  }, [])

  const closeSliderMenu = useCallback(() => {
    setMenuIsOpen(false)
  }, [])

  return (
    <MenuContext.Provider
      value={{
        menuIsOpen,
        toggleSliderMenu,
        closeSliderMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu(): MenuContextData {
  const context = useContext(MenuContext)

  if (!context) {
    throw new Error('useMenu must be used with an MenuProvider')
  }

  return context
}
