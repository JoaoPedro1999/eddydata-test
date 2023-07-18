type Mask =
  | 'phone'
  | 'cpf'
  | 'cep'
  | 'cnpj'
  | 'date'
  | 'currency'
  | 'integer'
  | 'numeric'
  | 'letters'
  | 'alphanumeric'
  | string

export function applyMask(value?: string, mask?: Mask): string {
  if (!value) {
    return ''
  }

  switch (mask) {
    case 'phone':
      return value
        .toString()
        .replace(/\D/g, '')
        .replace(/^(\d{2})\B/, '($1) ')
        .replace(/(\d{1})?(\d{4})(\d{4})/, '$1 $2-$3')
    case 'cpf':
      return value
        .toString()
        .replace(/\D/g, '')
        .replace(/^(\d{3})\B/, '$1.')
        .replace(/(\d{3})\B/, '$1.')
        .replace(/(\d{3})\B/, '$1-')
        .replace(/(\d{2})\B/, '$1')
    case 'cep':
      return value
        .toString()
        .replace(/\D/g, '')
        .replace(/^(\d{5})\B/, '$1-')
        .replace(/(\d{3})\B/, '$1')
    case 'cnpj':
      return value
        .toString()
        .replace(/\D/g, '')
        .replace(/^(\d{2})\B/, '$1.')
        .replace(/(\d{3})\B/, '$1.')
        .replace(/(\d{3})\B/, '$1/')
        .replace(/(\d{4})\B/, '$1-')
        .replace(/(\d{2})\B/, '$1')
    case 'date':
      return value
        .toString()
        .replace(/\D/g, '')
        .replace(/^(\d{2})\B/, '$1/')
        .replace(/(\d{2})\B/, '$1/')
        .replace(/(\d{4})\B/, '$1')

    case 'currency':
      return (
        'R$ ' +
        value
          .toString()
          .replace(/\D/g, '')
          .replace(/(\d)(\d{2})$/, '$1,$2')
          .replace(/(?=(\d{3})+(\D))\B/g, '.')
      )
    case 'integer':
      return value
        .toString()
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    case 'numeric':
      return value.toString().replace(/\D/g, '')
    case 'letters':
      return value.toString().replace(/[^a-zA-Z ]/g, '')
    case 'alphanumeric':
      return value.toString().replace(/[^a-zA-Z0-9 ]/g, '')
    default:
      return value
  }
}
