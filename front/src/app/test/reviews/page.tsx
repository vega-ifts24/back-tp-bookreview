'use client'
import {useEffect} from 'react'
import {Plus} from '@phosphor-icons/react'

import Table from '@/components/table/Table'
import {useReviewsStore} from '@/store/useReviewsStore'

const ReviewsPage = () => {
  const getAllReviews = useReviewsStore((state) => state.getAllReviews)
  const reviews = useReviewsStore((state) => state.reviews)
  const deleteReview = useReviewsStore((state) => state.deleteReview)

  return (
    <div className="gap-4 flex flex-col">
      <div className="flex justify-between gap-2">
        <h2 className="text-titleColor font-semibold text-lg text-center">
          Administrador de reseñas
        </h2>
      </div>
      <Table data={reviews} updateTable={getAllReviews} onDelete={deleteReview} />
    </div>
  )
}

export default ReviewsPage
