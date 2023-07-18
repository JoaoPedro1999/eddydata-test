import { Box, styled } from '@buma-ui/react-components'

export const Form = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})
