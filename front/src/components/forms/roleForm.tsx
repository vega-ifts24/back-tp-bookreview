'use client'
import {FormEvent, useState} from 'react'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import {useAuthStore} from '@/store/useAuthStore'
import {useRolesStore} from '@/store/useRolesStore'
import {useModalStore} from '@/store/useModalStore'

interface RoleFormProps {
  typeForm?: string
  prevData?: any
}

const RoleForm = ({typeForm, prevData}: RoleFormProps) => {
  const user = useAuthStore((state) => state.user)
  const editRole = useRolesStore((state) => state.editRole)
  const createRole = useRolesStore((state) => state.createRole)
  const closeModal = useModalStore((state) => state.closeModal)

  const [formData, setFormData] = useState({
    name: prevData?.name ?? '',
    description: prevData?.description ?? '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (typeForm === 'edit') {
        await editRole({token: user.token, id: prevData.id, formData})
      } else {
        await createRole({token: user.token, formData})
      }
      closeModal()
      window.location.reload() // eslint-disable-line
    } catch (error) {
      console.error('An error occurred:', error) // eslint-disable-line
    }
  }

  return (
    <article className="flex flex-col gap-4 w-full items-center">
      <form className="flex gap-4 flex-col w-full" id="RoleForm" onSubmit={handleSubmit}>
        <InputField
          id="name"
          setter={setFormData}
          title="Nombre del Rol"
          type="text"
          valueSetter={formData}
        />
        <InputField
          id="description"
          setter={setFormData}
          title="Descripción"
          type="text"
          valueSetter={formData}
        />
        <StyledButton
          form="RoleForm"
          styleType="filled"
          text={typeForm === 'edit' ? 'Editar' : 'Crear'}
          type="submit"
        />
      </form>
    </article>
  )
}

export default RoleForm
