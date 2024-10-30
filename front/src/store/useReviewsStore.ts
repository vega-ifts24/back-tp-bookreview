import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {toast} from 'sonner'

import {JSONResponse} from '@/types/JSONResponse'
import {ReviewI} from '@/types/reviews'

export interface ReviewsI {
  getReviewsByUser: ({token}: {token: string}) => Promise<JSONResponse<ReviewI[]>>
  reviews: ReviewI[]
  loadingReviews: boolean
}

export const useReviewsStore = create<ReviewsI>()(
  devtools(
    persist<ReviewsI>(
      (set) => ({
        reviews: [],
        loadingReviews: false,
        getReviewsByUser: async ({token}: {token: string}): Promise<JSONResponse<ReviewI[]>> => {
          console.log('getReviewsByUser => token: ', token) // eslint-disable-line
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
      }),
      {
        name: 'reviews-storage',
        storage: createJSONStorage(() => localStorage), // eslint-disable-line
      },
    ),
  ),
)
