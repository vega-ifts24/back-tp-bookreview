'use client'

import {BookmarkSimple, PencilSimple, Trash} from '@phosphor-icons/react'

import StyledButton from '../buttons/StyledButton'

import Rating from '@/pages/reviews/Rating'
import {BookI} from '@/types/books'
import {ReviewI} from '@/types/reviews'
import {formatDate} from '@/utils/constants/formatDate'
import {useReviewsStore} from '@/store/useReviewsStore'

interface CardReviewProps {
  review: ReviewI & BookI // review + book
}

const CardReview = ({review}: CardReviewProps) => {
  const editReview = useReviewsStore((state) => state.editReview)
  const deleteReview = useReviewsStore((state) => state.deleteReview)
  const archiveReview = useReviewsStore((state) => state.archiveReview)

  return (
    <div className="book-review-container flex gap-5 p-4 border border-gray-300 rounded-lg mb-3 shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
      <img
        alt={`Portada de ${review.title}`}
        className="book-cover w-24 h-36 rounded-md bg-gray-200"
        src={review.coverLink}
      />
      <div className="book-data-review flex-1 flex flex-col gap-2">
        <div className="flex justify-between">
          <h4 className="text-lg font-semibold">{review.title}</h4>
          <div className="flex gap-1 justify-end">
            <StyledButton
              icon={<BookmarkSimple color="black" size={16} />}
              onClick={() => archiveReview(review.id)}
            />
            <StyledButton
              icon={<PencilSimple color="blue" size={16} />}
              onClick={() => editReview(review.id)}
            />
            <StyledButton
              icon={<Trash color="red" size={16} />}
              onClick={() => deleteReview(review.id)}
            />
          </div>
        </div>
        <Rating ratingValue={Number(review.rating)} />
        <p className=" text-sm ">
          <span className="font-semibold">Comentario:</span> {review.description}
        </p>
        <p className=" text-sm ">
          <span className="font-semibold">Fecha de inicio:</span> {formatDate(review.startDate)}{' '}
        </p>
        <p className=" text-sm ">
          <span className="font-semibold">Fecha de fin:</span> {formatDate(review.endDate)}{' '}
        </p>
      </div>
    </div>
  )
}

export default CardReview
