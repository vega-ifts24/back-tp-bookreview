'use client'
import {FormEvent, useState} from 'react'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import {useAuthStore} from '@/store/useAuthStore'
import {useModalStore} from '@/store/useModalStore'
import {useUsersStore} from '@/store/useUsersStore'

interface UserFormProps {
  typeForm?: string
  prevData?: any
}

const UserForm = ({typeForm, prevData}: UserFormProps) => {
  const user = useAuthStore((state) => state.user)
  const editUser = useUsersStore((state) => state.editUser)
  const createUser = useUsersStore((state) => state.createUser)
  const closeModal = useModalStore((state) => state.closeModal)

  const [formData, setFormData] = useState({
    first_name: prevData?.first_name ?? '',
    surname: prevData?.surname ?? '',
    birth_date: prevData?.birth_date ?? '',
    email: prevData?.email ?? '',
    password: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (typeForm === 'edit') {
        await editUser({id: prevData.id, token: user.token, formData})
      } else {
        await createUser({token: user.token, formData})
      }
      closeModal()
      window.location.reload() // eslint-disable-line
    } catch (error) {
      console.error('An error occurred:', error) // eslint-disable-line
    }
  }

  return (
    <article className="flex flex-col gap-4 w-full items-center">
      <form className="flex gap-4 flex-col w-full" id="UserForm" onSubmit={handleSubmit}>
        <InputField
          id="first_name"
          setter={setFormData}
          title="Nombre"
          type="text"
          valueSetter={formData}
        />
        <InputField
          id="surname"
          setter={setFormData}
          title="Apellido"
          type="text"
          valueSetter={formData}
        />
        <InputField
          id="birth_date"
          setter={setFormData}
          title="Fecha de Nacimiento"
          type="date"
          valueSetter={formData}
        />
        <InputField
          id="email"
          setter={setFormData}
          title="Correo Electrónico"
          type="email"
          valueSetter={formData}
        />
        {typeForm !== 'edit' && (
          <InputField
            id="password"
            setter={setFormData}
            title="Contraseña"
            type="password"
            valueSetter={formData}
          />
        )}
        <StyledButton
          form="UserForm"
          styleType="filled"
          text={typeForm === 'edit' ? 'Editar' : 'Crear'}
          type="submit"
        />
      </form>
    </article>
  )
}

export default UserForm
