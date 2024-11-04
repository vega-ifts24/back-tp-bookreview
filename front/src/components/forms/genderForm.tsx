'use client'
import {FormEvent, useState} from 'react'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import {useAuthStore} from '@/store/useAuthStore'
import {useGenderStore} from '@/store/useGenderStore'
import {useModalStore} from '@/store/useModalStore'

interface GenderFormProps {
  typeForm?: string
  prevData?: any
}

const GenderForm = ({typeForm, prevData}: GenderFormProps) => {
  const createGender = useGenderStore((state) => state.createGender)
  const editGender = useGenderStore((state) => state.editGender)
  const closeModal = useModalStore((state) => state.closeModal)
  const user = useAuthStore((state) => state.user)

  const [formData, setFormData] = useState({
    name: prevData?.name || '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (typeForm === 'edit') {
        await editGender({token: user.token, id: prevData.id, formData})
      } else {
        await createGender({token: user.token, formData})
      }
      closeModal()
      window.location.reload() // eslint-disable-line
    } catch (error) {
      console.error('An error occurred:', error) // eslint-disable-line
    }
  }

  return (
    <article className="flex flex-col gap-4 w-full items-center">
      <form className="flex gap-4 flex-col w-full" id="GenderForm" onSubmit={handleSubmit}>
        <InputField
          id="name"
          setter={setFormData}
          title="Nombre del Género"
          type="text"
          valueSetter={formData}
        />
        <StyledButton
          styleType="filled"
          text={typeForm === 'edit' ? 'Editar Género' : 'Crear Género'}
          type="submit"
        />
      </form>
    </article>
  )
}

export default GenderForm
