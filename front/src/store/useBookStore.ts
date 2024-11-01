import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {toast} from 'sonner'

import {JSONResponse} from '@/types/JSONResponse'
import {BookI} from '@/types/books'

export interface BookStoreI {
  getAllBooks: ({busqueda}: {busqueda: string}) => Promise<JSONResponse<BookI[]>>
  loadingBooks: boolean
}

export const useBookStore = create<BookStoreI>()(
  devtools(
    persist<BookStoreI>(
      (set) => ({
        loadingBooks: false,

        getAllBooks: async ({busqueda}: {busqueda: string}): Promise<JSONResponse<BookI[]>> => {
          try {
            set({loadingBooks: true})
            let url = `${process.env.NEXT_PUBLIC_API_URL}/books`

            if (busqueda) {
              url = `${url}?search=${busqueda}`
            }
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })

            const data = await response.json()

            if (data.error) {
              set({loadingBooks: false})

              toast.error(data.message || 'Error al obtener los libros')

              return data
            }

            set({loadingBooks: false})

            return data
          } catch (error) {
            console.error('getAllBooks => Error al obtener los libros: ', error) // eslint-disable-line
            toast.error('Error al obtener los libros')

            return {
              error: true,
              status: 500,
              message: 'Error al obtener los libros',
              body: null,
            }
          }
        },
      }),
      {
        name: 'reviews-storage',
        storage: createJSONStorage(() => localStorage), // eslint-disable-line
      },
    ),
  ),
)
