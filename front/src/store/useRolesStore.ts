import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {toast} from 'sonner'

import {JSONResponse} from '@/types/JSONResponse'
import {RoleI} from '@/types/roles'

export interface RoleStoreI {
  roles: RoleI[]
  getAllRoles: ({token}: {token: string}) => Promise<JSONResponse<RoleI[]>>
  createRole: ({
    token,
    formData,
  }: {
    token: string
    formData: {
      name: string
      description: string
    }
  }) => Promise<JSONResponse<RoleI>>
  editRole: ({
    id,
    token,
    formData,
  }: {
    id: number
    token: string
    formData: {
      name: string
      description: string
    }
  }) => Promise<JSONResponse<RoleI>>
  deleteRole: ({id, token}: {id: number; token: string}) => Promise<JSONResponse<RoleI>>
}

export const useRolesStore = create<RoleStoreI>()(
  devtools(
    persist<RoleStoreI>(
      (set) => ({
        roles: [],
        getAllRoles: async ({token}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al obtener los roles')

              return data
            }

            set({
              roles: data.body as RoleI[],
            })

            return data
          } catch (error) {
            console.error('getAllRoles => Error al obtener los roles: ', error) // eslint-disable-line
            toast.error('Error al obtener los roles')

            return {error: true, status: 500, message: 'Error al obtener los roles', body: null}
          }
        },
        createRole: async ({token, formData}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al crear el rol')

              return data
            }

            toast.success('Rol creado correctamente')

            return data
          } catch (error) {
            console.error('createRole => Error al crear el rol: ', error) // eslint-disable-line
            toast.error('Error al crear el rol')

            return {error: true, status: 500, message: 'Error al crear el rol', body: null}
          }
        },
        editRole: async ({id, token, formData}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al editar el rol')

              return data
            }

            toast.success('Rol editado correctamente')

            return data
          } catch (error) {
            console.error('editRole => Error al editar el rol: ', error) // eslint-disable-line
            toast.error('Error al editar el rol')

            return {error: true, status: 500, message: 'Error al editar el rol', body: null}
          }
        },
        deleteRole: async ({id, token}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al eliminar el rol')

              return data
            }

            toast.success('Rol eliminado correctamente')

            return data
          } catch (error) {
            console.error('deleteRole => Error al eliminar el rol: ', error) // eslint-disable-line
            toast.error('Error al eliminar el rol')

            return {error: true, status: 500, message: 'Error al eliminar el rol', body: null}
          }
        },
      }),
      {
        name: 'roles-storage',
        storage: createJSONStorage(() => localStorage), // eslint-disable-line
      },
    ),
  ),
)
