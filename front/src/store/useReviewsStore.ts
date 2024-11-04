import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {toast} from 'sonner'

import {JSONResponse} from '@/types/JSONResponse'
import {ReviewFormI, ReviewI} from '@/types/reviews'

export interface ReviewsStoreI {
  getReviewsByUser: ({token}: {token: string}) => Promise<JSONResponse<ReviewI[]>>
  reviews: ReviewI[]
  loadingReviews: boolean
  deleteReview: ({id, token}: {id: number; token: string}) => Promise<JSONResponse<ReviewI[]>>
  archiveReview: ({id, token}: {id: number; token: string}) => Promise<JSONResponse<ReviewI[]>>
  createReview: ({
    token,
    review,
  }: {
    token: string
    review: ReviewFormI
  }) => Promise<JSONResponse<ReviewI>>
  editReview: ({
    id,
    token,
  }: {
    id: number
    token: string
    review: ReviewFormI
  }) => Promise<JSONResponse<ReviewI[]>>
  getAllReviews: () => Promise<JSONResponse<ReviewI[]>>
  getReviewsByBook: ({bookId}: {bookId: number}) => Promise<JSONResponse<ReviewI[]>>
}

export const useReviewsStore = create<ReviewsStoreI>()(
  devtools(
    persist<ReviewsStoreI>(
      (set, get) => ({
        reviews: [],
        loadingReviews: false,
        getReviewsByUser: async ({token}) => {
          try {
            set({loadingReviews: true})
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/user/list`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              set({loadingReviews: false, reviews: []})

              toast.error(data.message || 'Error al obtener las reseñas')

              return data
            }
            set({reviews: data?.body as ReviewI[], loadingReviews: false})

            return data
          } catch (error) {
            console.error('getReviews => Error al obtener las reseñas: ', error) // eslint-disable-line
            toast.error('Error al obtener las reseñas')

            return {
              error: true,
              status: 500,
              message: 'Error al obtener las reseñas',
              body: null,
            }
          }
        },
        getReviewsByBook: async ({bookId}) => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/reviews/book/${bookId}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al obtener las reseñas')

              return data
            }

            return data
          } catch (error) {
            console.error('getReviewsByBook => Error al obtener las reseñas: ', error) // eslint-disable-line
            toast.error('Error al obtener las reseñas')

            return {
              error: true,
              status: 500,
              message: 'Error al obtener las reseñas',
              body: null,
            }
          }
        },
        createReview: async ({token, review}) => {
          try {
            const formattedReview = {
              ...review,
              bookId: review.bookSelected.id,
              rating: review.rating,
              comment: review.comment,
              startDate: review.startDate,
              endDate: review.endDate,
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(formattedReview),
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al crear la reseña')

              return data
            }

            toast.success(`Reseña de ${review.bookSelected.title} creada correctamente`)
            get().getReviewsByUser({token})

            return data
          } catch (error) {
            console.error('createReview => Error al crear la reseña: ', error) // eslint-disable-line
            toast.error('Error al crear la reseña')

            return {
              error: true,
              status: 500,
              message: 'Error al crear la reseña',
              body: null,
            }
          }
        },
        editReview: async ({id, token, review}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(review),
            })

            const data = await response.json()

            if (data.error) {
              toast.error(
                data.message || `Error al editar la reseña de ${review.bookSelected.title}`,
              )

              return data
            }

            toast.success(`Reseña de ${review.bookSelected.title} editada correctamente`)
            get().getReviewsByUser({token})

            return data
          } catch (error) {
            console.error('editReview => Error al editar la reseña: ', error) // eslint-disable-line
            toast.error('Error al editar la reseña')
          }
        },
        deleteReview: async ({id, token}) => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            })

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al eliminar la reseña')

              return data
            }

            toast.success('Reseña eliminada correctamente')
            get().getReviewsByUser({token})

            return data
          } catch (error) {
            console.error('deleteReview => Error al eliminar la reseña: ', error) // eslint-disable-line
            toast.error('Error al eliminar la reseña')
          }
        },
        archiveReview: async ({id, token}) => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/reviews/archive/${id}`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              },
            )

            const data = await response.json()

            if (data.error) {
              toast.error(data.message || 'Error al archivar la reseña')

              return data
            }

            toast.success(data.message || 'Reseña archivada correctamente')
            get().getReviewsByUser({token})

            return data
          } catch (error) {
            console.error('deleteReview => Error al eliminar la reseña: ', error) // eslint-disable-line
            toast.error('Error al eliminar la reseña')
          }
        },
        getAllReviews: async () => {
          try {
            set({loadingReviews: true})
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })

            const data = await response.json()

            if (data.error) {
              set({loadingReviews: false, reviews: []})

              toast.error(data.message || 'Error al obtener las reseñas')

              return data
            }
            set({reviews: data?.body as ReviewI[], loadingReviews: false})

            return data
          } catch (error) {
            console.error('getReviews => Error al obtener las reseñas: ', error) // eslint-disable-line
            toast.error('Error al obtener las reseñas')

            return {
              error: true,
              status: 500,
              message: 'Error al obtener las reseñas',
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
