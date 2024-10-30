import {create} from 'zustand'
import {persist, createJSONStorage, devtools} from 'zustand/middleware'
import {toast} from 'sonner'
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {JSONResponse} from '@/types/JSONResponse'
import {TokenI, UserI} from '@/types/user'

export interface AuthI {
  user: UserI | null
  setUser: (user: UserI) => void
  logout: () => void
  generateToken: (email: string, password: string) => Promise<JSONResponse<TokenI>>
  getUserDataByToken: (token: string) => Promise<JSONResponse<UserI>>
  login: (email: string, password: string, router: AppRouterInstance) => Promise<void>
  register: ({
    firstName,
    surname,
    email,
    password,
    birthDate,
    router,
  }: {
    firstName: string
    surname: string
    email: string
    password: string
    birthDate: string
    router: AppRouterInstance
  }) => Promise<void>
}

export const useAuthStore = create<AuthI>()(
  devtools(
    persist<AuthI>(
      (set, get) => ({
        user: null,
        setUser: (user: UserI) => set({user}),
        generateToken: async (email: string, password: string): Promise<JSONResponse<TokenI>> => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({email, password}),
            })
            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al iniciar sesión')

              return data
            }

            set({user: {...get().user, ...data.body[0]}})

            return data
          } catch (error) {
            console.error('login => Error al iniciar sesión: ', error) // eslint-disable-line

            toast.error('Error al iniciar sesión')

            return {
              error: true,
              status: 500,
              message: 'Error al iniciar sesión',
              body: null,
            }
          }
        },
        getUserDataByToken: async (token: string): Promise<JSONResponse<UserI>> => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/details`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })
            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al obtener los datos del usuario')

              return data
            }

            set({user: {...get().user, ...data.body[0]}})
            toast.success(data.message || 'Datos del usuario obtenidos correctamente')

            return data
          } catch (error) {
            console.error('getUserData => Error al obtener los datos del usuario: ', error) // eslint-disable-line

            toast.error('Error al obtener los datos del usuario')

            return {
              error: true,
              status: 500,
              message: 'Error al obtener los datos del usuario',
              body: null,
            }
          }
        },
        login: async (email: string, password: string, router): Promise<void> => {
          try {
            const token = await get().generateToken(email, password)

            if (token?.body && token.body[0]?.token) {
              await get().getUserDataByToken(token.body[0].token || '')
              router.push('/')
            }
          } catch (error) {
            console.error('login => Error al iniciar sesión: ', error) // eslint-disable-line
            toast.error('Error al iniciar sesión')
          }
        },
        logout: () => set({user: null}),
        register: async ({
          firstName,
          surname,
          email,
          password,
          birthDate,
          router,
        }): Promise<void> => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                first_name: firstName,
                surname,
                email,
                password,
                birth_date: birthDate,
              }),
            })
            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al registrarse')

              return
            }
            toast.success('Registro exitoso')
            router.push('/login')
          } catch (error) {
            console.error('register => Error al registrarse: ', error) // eslint-disable-line
            toast.error('Error al registrarse')
          }
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage), // eslint-disable-line
      },
    ),
  ),
)
