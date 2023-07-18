import React from 'react'
import { IconProps } from '@phosphor-icons/react'

import { Container } from './styles'

interface ModalHeaderProps {
  icon: React.ComponentType<IconProps>
  headerTitle: string
  onClick: () => void
  disabled?: boolean
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  headerTitle,
  onClick,
  icon: Icon,
  disabled = false,
}) => {
  return (
    <Container>
      <button type="button" onClick={onClick} disabled={disabled}>
        <Icon size={24} />
      </button>
      <span>{headerTitle}</span>
    </Container>
  )
}
