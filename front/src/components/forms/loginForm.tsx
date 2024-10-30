'use client'
import {FC, FormEvent, useState} from 'react'
import {useRouter} from 'next/navigation'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import {useAuthStore} from '@/store/useAuthStore'

const LoginForm: FC = () => {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login(formData.email, formData.password, router)
  }

  return (
    <article className=" flex flex-col gap-4 w-full  items-center">
      <form className="flex gap-4 flex-col w-full max-w-96" id="loginForm" onSubmit={handleSubmit}>
        {/* Correo electrónico */}
        <InputField
          id="email"
          setter={setFormData}
          title="Correo electrónico"
          type="email"
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
        <StyledButton
          form="loginForm"
          styleType="filled"
          text="Iniciar sesión"
          type="submit"
          onClick={handleSubmit}
        />
      </form>
      <StyledButton text="Registrarse" />
    </article>
  )
}

export default LoginForm
