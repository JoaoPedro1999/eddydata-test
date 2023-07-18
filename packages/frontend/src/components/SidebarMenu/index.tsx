import { House, SignOut as SignOutIcon, Users } from '@phosphor-icons/react'
import { signOut } from 'next-auth/react'

import { useRouter } from 'next/navigation'

import { Container, NavigationButton } from './styles'

import { useMenu } from '@/hooks/menu'

export const SidebarMenu: React.FC = () => {
  const { menuIsOpen, toggleSliderMenu, closeSliderMenu } = useMenu()

  const { push } = useRouter()

  async function SignOut() {
    await signOut()
    push('/')
  }

  return (
    <Container
      status={menuIsOpen ? 'isOpen' : 'isClosed'}
      onMouseOver={() => {
        toggleSliderMenu()
      }}
      onMouseLeave={() => {
        closeSliderMenu()
      }}
    >
      <NavigationButton
        type="button"
        status={menuIsOpen ? 'isOpen' : 'isClosed'}
        onClick={() => push('/dashboard')}
      >
        {menuIsOpen ? (
          <>
            <House size={24} />
            Início
          </>
        ) : (
          <>
            <House size={24} />
          </>
        )}
      </NavigationButton>

      <NavigationButton
        type="button"
        status={menuIsOpen ? 'isOpen' : 'isClosed'}
        onClick={() => push('/dashboard/employers')}
      >
        {menuIsOpen ? (
          <>
            <Users size={24} />
            Colaboradores
          </>
        ) : (
          <>
            <Users size={24} />
          </>
        )}
      </NavigationButton>

      <NavigationButton
        type="button"
        status={menuIsOpen ? 'isOpen' : 'isClosed'}
        onClick={SignOut}
      >
        {menuIsOpen ? (
          <>
            <SignOutIcon size={24} />
            Sair
          </>
        ) : (
          <>
            <SignOutIcon size={24} />
          </>
        )}
      </NavigationButton>
    </Container>
  )
}
