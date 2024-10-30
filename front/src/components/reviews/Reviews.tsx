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
    if (user) {
      getReviewsByUser({token: user.token})
    }
  }, [user, getReviewsByUser])

  return (
    <section>
      <h2>Listado</h2>
      <ul>
        {loadingReviews ? (
          <p>Cargando...</p>
        ) : reviews.length === 0 ? (
          <p>Aún no tienes reseñas</p>
        ) : (
          reviews.map((review: ReviewI) => <CardReview key={review.id} review={review} />)
        )}
      </ul>
    </section>
  )
}

export default Reviews
