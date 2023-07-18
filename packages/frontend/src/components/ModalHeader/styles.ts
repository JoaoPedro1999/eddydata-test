import { styled } from '@buma-ui/react-components'

export const Container = styled('div', {
  width: '100%',
  padding: '$4',
  backgroundColor: '$gray500',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  [`button`]: {
    background: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '$8',
    height: '$8',
    marginRight: '$2',

    [`svg`]: {
      width: '$6',
      height: '$6',
      color: '$white',
    },
  },

  [`span`]: {
    fontFamily: '$default',
    fontSize: '$xl',
    fontWeight: 500,
  },
})
