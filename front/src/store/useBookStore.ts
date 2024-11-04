import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {toast} from 'sonner'

import {JSONResponse} from '@/types/JSONResponse'
import {BookI} from '@/types/books'

export interface BookStoreI {
  books: BookI[]
  loadingBooks: boolean
  filterBooks: {
    search: string
    genderId: string
    author: string
  }
  getAllBooks: () => Promise<JSONResponse<BookI[]>>
  createBook: ({
    token,
    formData,
  }: {
    token: string
    formData: {
      title: string
      author: string
      genderId: string
      imageLink?: string // Opcional
    }
  }) => Promise<JSONResponse<BookI>>
  editBook: ({
    id,
    token,
    formData,
  }: {
    id: number
    token: string
    formData: {
      title: string
      author: string
      genderId: string
      imageLink?: string // Opcional
    }
  }) => Promise<JSONResponse<BookI>>
  deleteBook: ({id, token}: {id: number; token: string}) => Promise<JSONResponse<BookI>>
  setFilterBooks: (filter: {search: string; genderId: string; author: string}) => void
  resetBooksValues: () => void
}

export const useBookStore = create<BookStoreI>()(
  devtools(
    persist<BookStoreI>(
      (set, get) => ({
        books: [],
        loadingBooks: false,
        filterBooks: {
          search: '',
          genderId: '',
          author: '',
        },

        setFilterBooks: (filter) => {
          set({filterBooks: filter})
        },

        getAllBooks: async (): Promise<JSONResponse<BookI[]>> => {
          try {
            set({loadingBooks: true})
            let url = `${process.env.NEXT_PUBLIC_API_URL}/books`

            if (get().filterBooks.search) {
              url += `?search=${get().filterBooks.search}`
            }

            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })

            const data = await response.json()

            set({loadingBooks: false, books: data.body as BookI[]})

            return data
          } catch (error) {
            console.error('getAllBooks => Error: ', error) // eslint-disable-line
            toast.error('Error al obtener los libros')

            return {error: true, status: 500, message: 'Error al obtener los libros', body: null}
          }
        },

        createBook: async ({token, formData}) => {
          const formattedData = new FormData()

          formattedData.append('title', formData.title)
          formattedData.append('author', formData.author)
          formattedData.append('genderId', formData.genderId)
          if (formData.imageLink) {
            formattedData.append('imageLink', formData.imageLink)
          }

          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formattedData,
            })

            const data = await response.json()

            toast.success('Libro creado correctamente')

            return data
          } catch (error) {
            console.error('createBook => Error: ', error) // eslint-disable-line
            toast.error('Error al crear el libro')

            return {error: true, status: 500, message: 'Error al crear el libro', body: null}
          }
        },

        editBook: async ({id, token, formData}) => {
          const formattedData = new FormData()

          formattedData.append('title', formData.title)
          formattedData.append('author', formData.author)
          formattedData.append('genderId', formData.genderId)
          if (formData.imageLink) {
            formattedData.append('imageLink', formData.imageLink)
          }
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formattedData,
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al editar el libro')

              return data
            }

            toast.success('Libro editado correctamente')

            return data
          } catch (error) {
            console.error('editBook => Error: ', error) // eslint-disable-line
            toast.error('Error al editar el libro')

            return {error: true, status: 500, message: 'Error al editar el libro', body: null}
          }
        },

        deleteBook: async ({id, token}) => {
          console.log('id', id)
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al eliminar el libro')

              return data
            }

            toast.success('Libro eliminado correctamente')
            set((state) => ({
              books: state.books.filter((book) => book.id !== id),
            }))

            return data
          } catch (error) {
            console.error('deleteBook => Error: ', error) // eslint-disable-line
            toast.error('Error al eliminar el libro')
          }
        },

        resetBooksValues: () => {
          set({
            filterBooks: {
              search: '',
              genderId: '',
              author: '',
            },
            loadingBooks: false,
          })
        },
      }),
      {
        name: 'books-storage',
        storage: createJSONStorage(() => localStorage), // eslint-disable-line
      },
    ),
  ),
)
