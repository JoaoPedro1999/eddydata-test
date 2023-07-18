import { Box, Heading, styled } from '@buma-ui/react-components'
import Link from 'next/link'

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

export const Employer = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '$2 auto',
  background: '$gray600',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    fontSize: '$xl',
    fontWeight: '$bold',
  },
})

export const EmployerHeading = styled(Link, {
  fontFamily: '$default',
  lineHeight: '$shorter',
  margin: 0,
  color: '$gray100',

  variants: {
    size: {
      sm: { fontSize: '$xl' },
      md: { fontSize: '$2xl' },
      lg: { fontSize: '$4xl' },
      '2xl': { fontSize: '$5xl' },
      '3xl': { fontSize: '$6xl' },
      '4xl': { fontSize: '$7xl' },
      '5xl': { fontSize: '$8xl' },
      '6xl': { fontSize: '$9xl' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export const EmployerActions = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$4',
})

export const EmployerActionButton = styled('button', {
  all: 'unset',

  [`svg`]: {
    width: '1.5rem',
    height: '1.5rem',
  },

  variants: {
    options: {
      normal: {
        color: 'white',
      },
      attention: {
        color: 'Red',
      },
    },
  },
})
