import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {toast} from 'sonner'

import {JSONResponse} from '@/types/JSONResponse'
import {GenderI} from '@/types/gender'

export interface GenderStoreI {
  genders: GenderI[]
  getAllGenders: ({token}: {token: string}) => Promise<JSONResponse<GenderI>>
  createGender: ({
    token,
    formData,
  }: {
    token: string
    formData: {
      name: string
    }
  }) => Promise<JSONResponse<GenderI>>
  editGender: ({
    id,
    token,
    formData,
  }: {
    id: number
    token: string
    formData: {
      name: string
    }
  }) => Promise<JSONResponse<GenderI>>
  deleteGender: ({id, token}: {id: number; token: string}) => Promise<JSONResponse<GenderI>>
}

export const useGenderStore = create<GenderStoreI>()(
  devtools(
    persist<GenderStoreI>(
      (set) => ({
        genders: [],
        getAllGenders: async ({token}) => {
          try {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/genders`

            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al obtener los generos')

              return data
            }

            set({
              genders: data.body as GenderI[],
            })

            return data
          } catch (error) {
            console.error('getAllGenders => Error al obtener los generos: ', error) // eslint-disable-line
            toast.error('Error al obtener los generos')

            return {
              error: true,
              status: 500,
              message: 'Error al obtener los generos',
              body: null,
            }
          }
        },
        createGender: async ({token, formData}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genders`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al crear la género')

              return data
            }

            toast.success('Género creado correctamente')

            return data
          } catch (error) {
            console.error('createGender => Error al crear la género: ', error) // eslint-disable-line
            toast.error('Error al crear la género')

            return {
              error: true,
              status: 500,
              message: 'Error al crear la género',
              body: null,
            }
          }
        },
        editGender: async ({id, token, formData}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genders/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al editar la género')

              return data
            }

            toast.success('Género editado correctamente')

            return data
          } catch (error) {
            console.error('editGender => Error al editar la género: ', error) // eslint-disable-line
            toast.error('Error al editar la género')
          }
        },
        deleteGender: async ({id, token}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genders/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al eliminar la género')

              return data
            }

            toast.success('Género eliminado correctamente')

            return data
          } catch (error) {
            console.error('deleteGender => Error al eliminar la género: ', error) // eslint-disable-line
            toast.error('Error al eliminar la género')
          }
        },
      }),
      {
        name: 'genders-storage',
        storage: createJSONStorage(() => localStorage), // eslint-disable-line
      },
    ),
  ),
)
