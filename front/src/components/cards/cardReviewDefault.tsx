'use client'

import Rating from '@/pages/reviews/items/Rating'
import {ReviewI} from '@/types/reviews'
import {formatDate} from '@/utils/constants/formatDate'

interface CardReviewDefaultProps {
  review: ReviewI & {first_name: string; surname: string; profile_image: string}
}

const CardReviewDefault = ({review}: CardReviewDefaultProps) => {
  return (
    <div
      className={`flex gap-5 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 transition-shadow`}
    >
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between">
          <h4 className="text-lg font-semibold">{review.title}</h4>
        </div>
        <div className="flex gap-2 items-center">
          <img
            alt={`${review.first_name} ${review.surname}`}
            className="w-8 h-8 rounded-full"
            src={review.profile_image}
          />
          <p className="text-sm font-semibold">
            {review.first_name} {review.surname}
          </p>
          <Rating ratingValue={Number(review.rating)} size={14} />
        </div>
        <p className="text-xs">
          {formatDate(review.startDate)} - {formatDate(review.endDate)}
        </p>
        <p className="text-sm">{review.comment}</p>
      </div>
    </div>
  )
}

export default CardReviewDefault
