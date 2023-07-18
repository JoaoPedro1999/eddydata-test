import { X } from '@phosphor-icons/react'
import { TextInput, Button, Text } from '@buma-ui/react-components'
import { Controller, useForm } from 'react-hook-form'

import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { AxiosError } from 'axios'

import { Form } from './styles'

import { Modal } from '@/components/Modal'
import { ModalHeader } from '@/components/ModalHeader'
import { useModal } from '@/hooks/modals'
import { applyMask } from '@/utils/applyMask'
import { api } from '@/lib/api'

const RegisterEmployerFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  birthdate: z.string(),
  gender: z.string(),
})

type RegisterEmployerFormData = z.infer<typeof RegisterEmployerFormSchema>

export const RegisterEmployer: React.FC = () => {
  const { modalRegisterEmployerIsOpen, toggleRegisterEmployerModal } =
    useModal()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterEmployerFormData>({
    resolver: zodResolver(RegisterEmployerFormSchema),
  })

  async function handleRegister(data: RegisterEmployerFormData) {
    try {
      const formattedDate = data.birthdate
        .replaceAll('/', '-')
        .split('-')
        .reverse()
        .join('-')

      const employer = {
        birthdate: new Date(formattedDate).toISOString(),
        name: data.name,
        email: data.email,
        gender: data.gender === 'Feminino' ? 'FEMALE' : 'MALE',
      }

      await api.post('/employers', employer)

      toggleRegisterEmployerModal()
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
      isOpen={modalRegisterEmployerIsOpen}
      setIsOpen={toggleRegisterEmployerModal}
    >
      <ModalHeader
        headerTitle="Novo colaborador"
        onClick={toggleRegisterEmployerModal}
        icon={X}
      />
      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Nome</Text>
          <TextInput type="text" {...register('name')} />
        </label>
        <label>
          <Text size="sm">Email</Text>
          <TextInput
            placeholder="example@email.com"
            type="email"
            {...register('email')}
          />
        </label>
        <label>
          <Text size="sm">Genero</Text>
          <TextInput
            type="text"
            placeholder="Femino/Masculino"
            {...register('gender')}
          />
        </label>
        <label>
          <Text size="sm">Data de Nascimento</Text>
          <Controller
            name={'birthdate'}
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
        <Button type="submit" disabled={isSubmitting}>
          Salvar
        </Button>
      </Form>
    </Modal>
  )
}
