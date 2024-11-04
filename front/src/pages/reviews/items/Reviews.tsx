'use client'
import {useEffect} from 'react'

import CardReview from './CardReview'

import {useReviewsStore} from '@/store/useReviewsStore'
import {useAuthStore} from '@/store/useAuthStore'
import {ReviewI} from '@/types/reviews'

const Reviews = () => {
  const getReviewsByUser = useReviewsStore((state) => state.getReviewsByUser)
  const reviews = useReviewsStore((state) => state.reviews)
  const user = useAuthStore((state) => state.user)
  const loadingReviews = useReviewsStore((state) => state.loadingReviews)

  useEffect(() => {
    async function fetchReviews() {
      try {
        if (user) {
          getReviewsByUser({token: user.token})
        }
      } catch (error) {
        console.error('Error al obtener las reseñas: ', error) // eslint-disable-line
      }
    }
    fetchReviews()
  }, [user, getReviewsByUser])

  return (
    <section className=" flex flex-col gap-4">
      {loadingReviews ? (
        <p>Cargando...</p>
      ) : reviews.length === 0 ? (
        <p>Aún no tienes reseñas</p>
      ) : (
        reviews.map((review: ReviewI) => <CardReview key={review.id} review={review} />)
      )}
    </section>
  )
}

export default Reviews
