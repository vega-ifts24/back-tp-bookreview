import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {toast} from 'sonner'

import {JSONResponse} from '@/types/JSONResponse'
import {UserI} from '@/types/user'

export interface UserStoreI {
  users: UserI[]
  getAllUsers: ({token}: {token: string}) => Promise<JSONResponse<UserI[]>>
  getUserById: ({id, token}: {id: number; token: string}) => Promise<JSONResponse<UserI>>
  createUser: ({
    token,
    formData,
  }: {
    token: string
    formData: {
      first_name: string
      surname: string
      birth_date: string
    }
  }) => Promise<JSONResponse<UserI>>
  editUser: ({
    token,
    formData,
  }: {
    token: string
    formData: {
      first_name: string
      surname: string
      birth_date: string
    }
  }) => Promise<JSONResponse<UserI>>
  deleteUser: ({token}: {token: string}) => Promise<JSONResponse<UserI>>
}

export const useUsersStore = create<UserStoreI>()(
  devtools(
    persist<UserStoreI>(
      (set) => ({
        users: [],
        getAllUsers: async ({token}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al obtener los usuarios')

              return data
            }

            set({users: data.body as UserI[]})

            return data
          } catch (error) {
            console.error('getAllUsers => Error al obtener los usuarios: ', error) // eslint-disable-line
            toast.error('Error al obtener los usuarios')

            return {error: true, status: 500, message: 'Error al obtener los usuarios', body: null}
          }
        },
        getUserById: async ({id, token}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al obtener el usuario')

              return data
            }

            return data
          } catch (error) {
            console.error('getUserById => Error al obtener el usuario: ', error) // eslint-disable-line
            toast.error('Error al obtener el usuario')

            return {error: true, status: 500, message: 'Error al obtener el usuario', body: null}
          }
        },
        createUser: async ({token, formData}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al crear el usuario')

              return data
            }

            toast.success('Usuario creado correctamente')

            return data
          } catch (error) {
            console.error('createUser => Error al crear el usuario: ', error) // eslint-disable-line
            toast.error('Error al crear el usuario')

            return {error: true, status: 500, message: 'Error al crear el usuario', body: null}
          }
        },
        editUser: async ({id, token, formData}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/details/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al editar el usuario')

              return data
            }

            toast.success('Usuario editado correctamente')

            return data
          } catch (error) {
            console.error('editUser => Error al editar el usuario: ', error) // eslint-disable-line
            toast.error('Error al editar el usuario')

            return {error: true, status: 500, message: 'Error al editar el usuario', body: null}
          }
        },
        deleteUser: async ({id, token}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al eliminar el usuario')

              return data
            }

            toast.success('Usuario eliminado correctamente')

            return data
          } catch (error) {
            console.error('deleteUser => Error al eliminar el usuario: ', error) // eslint-disable-line
            toast.error('Error al eliminar el usuario')

            return {error: true, status: 500, message: 'Error al eliminar el usuario', body: null}
          }
        },
      }),
      {
        name: 'users-storage',
        storage: createJSONStorage(() => localStorage), // eslint-disable-line
      },
    ),
  ),
)
