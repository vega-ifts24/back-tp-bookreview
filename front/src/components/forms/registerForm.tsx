'use client'
import {FC, FormEvent, useState} from 'react'
import {useRouter} from 'next/navigation'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import {useAuthStore} from '@/store/useAuthStore'

const RegisterForm: FC = () => {
  const router = useRouter()
  const register = useAuthStore((state) => state.register)
  const [formData, setFormData] = useState({
    first_name: '',
    surname: '',
    email: '',
    password: '',
    birth_date: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    register({
      firstName: formData.first_name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      birthDate: formData.birth_date,
      router,
    })
  }

  return (
    <article className="flex flex-col gap-4 w-full items-center">
      <form
        className="flex flex-col gap-4 w-full max-w-lg"
        id="registerForm"
        onSubmit={handleSubmit}
      >
        <InputField
          id="first_name"
          setter={setFormData}
          title="Nombre"
          value={formData.first_name}
          valueSetter={formData}
        />
        <InputField
          id="surname"
          setter={setFormData}
          title="Apellido"
          value={formData.surname}
          valueSetter={formData}
        />
        <InputField
          id="email"
          setter={setFormData}
          title="Correo electrónico"
          value={formData.email}
          valueSetter={formData}
        />
        <InputField
          id="password"
          setter={setFormData}
          title="Contraseña"
          type="password"
          value={formData.password}
          valueSetter={formData}
        />
        <InputField
          id="birth_date"
          setter={setFormData}
          title="Fecha de nacimiento"
          type="date"
          value={formData.birth_date}
          valueSetter={formData}
        />

        <StyledButton form="registerForm" styleType="filled" text="Registrarse" type="submit" />
      </form>
    </article>
  )
}

export default RegisterForm
