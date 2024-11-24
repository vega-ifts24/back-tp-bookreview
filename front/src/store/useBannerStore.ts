import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {toast} from 'sonner'

import {JSONResponse} from '@/types/JSONResponse'
import {BannerI} from '@/types/banners'

export interface BannerStoreI {
  banners: BannerI[]
  getAllBanners: () => Promise<JSONResponse<BannerI[]>>
  createBanner: ({
    token,
    formData,
  }: {
    token: string
    formData: {
      title: string
      section: string
      imageLink?: string // Si es necesario, ajusta según tu modelo.
    }
  }) => Promise<JSONResponse<BannerI>>
  editBanner: ({
    id,
    token,
    formData,
  }: {
    id: number
    token: string
    formData: {
      title: string
      section: string
      imageLink?: string // Si es necesario, ajusta según tu modelo.
    }
  }) => Promise<JSONResponse<BannerI>>
  deleteBanner: ({id, token}: {id: number; token: string}) => Promise<JSONResponse<BannerI>>
}

export const useBannerStore = create<BannerStoreI>()(
  devtools(
    persist<BannerStoreI>(
      (set) => ({
        banners: [],
        getAllBanners: async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al obtener los banners')

              return data
            }

            set({banners: data.body as BannerI[]})

            return data
          } catch (error) {
            console.error('getAllBanners => Error al obtener los banners: ', error) // eslint-disable-line
            toast.error('Error al obtener los banners')

            return {
              error: true,
              status: 500,
              message: 'Error al obtener los banners',
              body: null,
            }
          }
        },
        createBanner: async ({token, formData}) => {
          const formatedData = new FormData()

          formatedData.append('title', formData.title)
          formatedData.append('section', formData.section)
          if (formData.imageLink) {
            formatedData.append('imageLink', formData.imageLink)
          }

          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formatedData,
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al crear el banner')

              return data
            }

            toast.success('Banner creado correctamente')
            set((state) => ({banners: [...state.banners, data.body]})) // Agregar el nuevo banner a la lista

            return data
          } catch (error) {
            console.error('createBanner => Error al crear el banner: ', error) // eslint-disable-line
            toast.error('Error al crear el banner')

            return {
              error: true,
              status: 500,
              message: 'Error al crear el banner',
              body: null,
            }
          }
        },
        editBanner: async ({id, token, formData}) => {
          const formatedData = new FormData()

          formatedData.append('title', formData.title)
          formatedData.append('section', formData.section)
          if (formData.imageLink) {
            formatedData.append('imageLink', formData.imageLink)
          }

          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/${id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formatedData,
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al editar el banner')

              return data
            }

            toast.success('Banner editado correctamente')
            set((state) => ({
              banners: state.banners.map((banner) => (banner.id === id ? data.body : banner)),
            })) // Actualiza el banner en la lista

            return data
          } catch (error) {
            console.error('editBanner => Error al editar el banner: ', error) // eslint-disable-line
            toast.error('Error al editar el banner')

            return {
              error: true,
              status: 500,
              message: 'Error al editar el banner',
              body: null,
            }
          }
        },
        deleteBanner: async ({id, token}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al eliminar el banner')

              return data
            }

            toast.success('Banner eliminado correctamente')
            set((state) => ({
              banners: state.banners.filter((banner) => banner.id !== id), // Filtrar el banner eliminado
            }))

            return data
          } catch (error) {
            console.error('deleteBanner => Error al eliminar el banner: ', error) // eslint-disable-line
            toast.error('Error al eliminar el banner')
          }
        },
      }),
      {
        name: 'banners-storage',
        storage: createJSONStorage(() => localStorage), // eslint-disable-line
      },
    ),
  ),
)
