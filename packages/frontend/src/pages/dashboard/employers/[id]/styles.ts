import { Box, Heading, styled } from '@buma-ui/react-components'

export const Container = styled('main', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 1004,
  margin: '0 auto',
})

export const Header = styled('div', {
  padding: '$6',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    fontSize: '$4xl',
  },

  [`svg`]: {
    width: '1.5rem',
    height: '1.5rem',
  },
})

export const Content = styled('div', {
  padding: '$6',
  width: '100%',
})

export const RemunerationsHeader = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '$2 auto',
  background: '$gray700',

  [`${Heading}`]: {
    textAlign: 'center',

    fontSize: '$xl',
  },
})

export const RemunerationsContent = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '$2 auto',
  background: '$gray500',

  [`${Heading}`]: {
    textAlign: 'center',
    fontSize: '$lg',
  },
})
