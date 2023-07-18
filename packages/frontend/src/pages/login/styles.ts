import { Box, Heading, Text, styled } from '@buma-ui/react-components'

export const Container = styled('main', {
  maxWidth: 572,
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'stretch',
  margin: '0 auto',
})

export const Header = styled('div', {
  padding: '0 $6',
  width: '100%',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    textAlign: 'center',
    width: '100%',
    display: 'inline-block',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const Form = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})
