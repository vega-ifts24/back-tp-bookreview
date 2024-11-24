'use client'
import {FC, FormEvent, useState} from 'react'
import {useRouter} from 'next/navigation'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import logo from '@/assets/logo.png'
import {useAuthStore} from '@/store/useAuthStore'
const RegisterForm: FC = () => {
  const router = useRouter()
  const register = useAuthStore((state) => state.register)
  const [formData, setFormData] = useState<{
    first_name: string
    surname: string
    email: string
    password: string
    birth_date: string
    imageLink: string | File | undefined
  }>({
    first_name: '',
    surname: '',
    email: '',
    password: '',
    birth_date: '',
    imageLink: undefined,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await register({
      formData,
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
        {/* Imagen de perfil */}
        <img
          alt={`Imagen de perfil de ${formData.first_name}`}
          className="w-24 h-24 rounded-full clip-path-circle bg-backgroundNavbar object-cover  self-center"
          src={
            typeof formData?.imageLink === 'string' && formData?.imageLink?.includes('uploads')
              ? process.env.NEXT_PUBLIC_API_URL + formData?.imageLink
              : typeof formData?.imageLink === 'object'
                ? URL.createObjectURL(formData?.imageLink)
                : logo?.src
          }
        />
        <InputField
          id="imageLink"
          setter={setFormData}
          title="Imagen de perfil"
          type="file"
          valueSetter={formData}
        />
        <InputField id="first_name" setter={setFormData} title="Nombre" valueSetter={formData} />
        <InputField id="surname" setter={setFormData} title="Apellido" valueSetter={formData} />
        <InputField
          id="email"
          setter={setFormData}
          title="Correo electrónico"
          valueSetter={formData}
        />
        <InputField
          id="password"
          setter={setFormData}
          title="Contraseña"
          type="password"
          valueSetter={formData}
        />
        <InputField
          id="birth_date"
          setter={setFormData}
          title="Fecha de nacimiento"
          type="date"
          valueSetter={formData}
        />

        <StyledButton form="registerForm" styleType="filled" text="Registrarse" type="submit" />
      </form>
    </article>
  )
}

export default RegisterForm
