import { styled } from '@buma-ui/react-components'

export const Container = styled('nav', {
  position: 'fixed',
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 5,
  height: '100%',
  background: '$gray900',

  variants: {
    status: {
      isClosed: {
        width: '60px',
        transition: 'width 150ms',
      },
      isOpen: {
        width: '260px',
        transition: 'width 150ms',
      },
    },
  },
})

export const NavigationButton = styled('button', {
  background: 'transparent',
  border: 'none',
  height: '4.8rem',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  color: 'white',
  cursor: 'pointer',
  alignContent: 'center',

  [`> svg`]: {
    marginRight: '1.6rem',
  },

  variants: {
    status: {
      isOpen: {
        justifyContent: 'flex-start',
      },
      isClosed: {
        justifyContent: 'center',

        [`> svg`]: {
          marginRight: 'unset',
        },
      },
    },
  },
})
