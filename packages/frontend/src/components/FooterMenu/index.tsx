import { House, Users, SignOut as SignOutIcon } from '@phosphor-icons/react'
import Link from 'next/link'

import { signOut } from 'next-auth/react'

import { useRouter } from 'next/router'

import { Container } from './styles'

export const FooterMenu: React.FC = () => {
  const { push } = useRouter()

  async function SignOut() {
    await signOut()
    push('/')
  }

  return (
    <>
      <Container>
        <Link href={'/dashboard'}>
          <House size={24} />
          <span>Inicio</span>
        </Link>

        <Link href={'/dashboard/employers'}>
          <Users size={24} />
          <span>Colaboradores</span>
        </Link>

        <button onClick={SignOut}>
          <SignOutIcon size={24} />
          <span>Sair</span>
        </button>
      </Container>
    </>
  )
}
