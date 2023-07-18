import { X } from '@phosphor-icons/react'

import { TextInput, Button, Text } from '@buma-ui/react-components'

import { Controller, useForm } from 'react-hook-form'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/router'

import { AxiosError } from 'axios'

import { Form } from './styles'

import { Modal } from '@/components/Modal'
import { ModalHeader } from '@/components/ModalHeader'
import { applyMask } from '@/utils/applyMask'
import { api } from '@/lib/api'
import { useModal } from '@/hooks/modals'

const RegisterRemunerationFormSchema = z.object({
  payday: z.string(),
  remuneration_type: z.string(),
  remuneration_value: z.string(),
})

type RegisterRemunerationFormData = z.infer<
  typeof RegisterRemunerationFormSchema
>

export const RegisterRemuneration: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRemunerationFormData>({
    resolver: zodResolver(RegisterRemunerationFormSchema),
  })

  const { modalRegisterRemunerationIsOpen, toggleRegisterRemunerationModal } =
    useModal()

  const { query } = useRouter()

  async function handleRegister(data: RegisterRemunerationFormData) {
    try {
      const formattedDate = data.payday
        .replaceAll('/', '-')
        .split('-')
        .reverse()
        .join('-')

      const remuneration = {
        remuneration_value: +data.remuneration_value
          .split(' ')[1]
          .replaceAll('.', '')
          .replace(',', '.'),
        employerId: query.id,
        payday: new Date(formattedDate).toISOString(),
        remuneration_type: data.remuneration_type,
      }

      await api.post('/remuneration', remuneration)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }

      console.error(err)
    }
  }

  return (
    <Modal
      padding="0"
      width="40rem"
      isOpen={modalRegisterRemunerationIsOpen}
      setIsOpen={toggleRegisterRemunerationModal}
    >
      <ModalHeader
        headerTitle="Nova Remuneração"
        onClick={toggleRegisterRemunerationModal}
        icon={X}
      />
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Data de Pagamento</Text>
          <Controller
            name={'payday'}
            control={control}
            render={({ field }) => {
              return (
                <TextInput
                  value={field.value}
                  type="text"
                  onChange={(e) =>
                    field.onChange(applyMask(String(e.target.value), 'date'))
                  }
                  maxLength={10}
                />
              )
            }}
          />
        </label>
        <label>
          <Text size="sm">Forma de Pagamento</Text>
          <TextInput type="text" {...register('remuneration_type')} />
        </label>
        <label>
          <Text size="sm">Valor</Text>
          <Controller
            name={'remuneration_value'}
            control={control}
            render={({ field }) => {
              return (
                <TextInput
                  type="text"
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(
                      applyMask(String(e.target.value), 'currency'),
                    )
                  }
                />
              )
            }}
          />
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Salvar
        </Button>
      </Form>
    </Modal>
  )
}
