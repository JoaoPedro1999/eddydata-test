import { styled } from '@buma-ui/react-components'

export const Container = styled('div', {
  position: 'fixed',
  bottom: 0,
  zIndex: 5,
  width: '1024px',
  maxWidth: '100%',
  height: '5.6rem',
  background: '$gray900',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',

  a: {
    textDecoration: 'none',
    color: '$white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '6rem',
    gap: '0.4rem',

    svg: {
      width: '2rem',
    },

    span: {
      fontFamily: '$default',
      fontSize: '1rem',
      fontWeight: 500,
    },
  },

  button: {
    background: 'transparent',
    border: 'none',
    color: '$white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '6rem',
    gap: '0.4rem',

    svg: {
      width: '2rem',
    },

    span: {
      fontFamily: '$default',
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
})
