'use client'
import {FC, FormEvent, useState} from 'react'
import {useRouter} from 'next/navigation'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import {useAuthStore} from '@/store/useAuthStore'
import profile_image from '@/assets/default-profile.png'
const RegisterForm: FC = () => {
  const router = useRouter()
  const register = useAuthStore((state) => state.register)
  const [formData, setFormData] = useState({
    first_name: '',
    surname: '',
    email: '',
    password: '',
    birth_date: '',
    profile_image: {} as {
      imageUrl: string
      imageFile: File
    },
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
        {/* Imagen de perfil */}
        <img
          alt={`Imagen de perfil de ${formData.first_name}`}
          className="w-24 h-24 rounded-full bg-backgroundNavbar object-cover  self-center"
          src={formData?.profile_image?.imageUrl || profile_image.src}
        />
        <InputField
          id="profile_image"
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
