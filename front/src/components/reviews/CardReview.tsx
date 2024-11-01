'use client'

import {BookmarkSimple, PencilSimple, Trash} from '@phosphor-icons/react'

import StyledButton from '../buttons/StyledButton'
import ReviewForm from '../forms/reviewForm'

import Rating from '@/pages/reviews/Rating'
import {ReviewI} from '@/types/reviews'
import {formatDate} from '@/utils/constants/formatDate'
import {useReviewsStore} from '@/store/useReviewsStore'
import {useAuthStore} from '@/store/useAuthStore'
import {useModalStore} from '@/store/useModalStore'

interface CardReviewProps {
  review: ReviewI // review + book
}

const CardReview = ({review}: CardReviewProps) => {
  const deleteReview = useReviewsStore((state) => state.deleteReview)
  const archiveReview = useReviewsStore((state) => state.archiveReview)
  const user = useAuthStore((state) => state.user)
  const setModal = useModalStore((state) => state.setModal)

  return (
    <div
      className={` ${review.archived && 'opacity-20'} 
        flex gap-5 p-4 border border-gray-300 rounded-lg  shadow-sm bg-gray-50 hover:shadow-md transition-shadow`}
    >
      <img
        alt={`Portada de ${review.title}`}
        className="w-24 h-36 rounded-md bg-gray-200"
        src={review.coverLink}
      />
      <div className=" flex-1 flex flex-col gap-2">
        <div className="flex justify-between">
          <div>
            <h4 className="text-lg font-semibold">{review.title}</h4>
            <div className="flex gap-2">
              <p className="text-sm">{review.author}</p>·
              <Rating ratingValue={Number(review.rating)} size={14} />
            </div>
          </div>
          <div className="flex gap-1 justify-end">
            <StyledButton
              icon={
                <BookmarkSimple
                  color="black"
                  size={16}
                  weight={review.archived ? 'fill' : 'regular'}
                />
              }
              onClick={() => archiveReview({id: review.id, token: user.token})}
            />
            <StyledButton
              icon={<PencilSimple color="blue" size={16} />}
              onClick={() =>
                setModal({
                  visibilty: true,
                  title: 'Editar reseña',
                  children: <ReviewForm review={review} />,
                })
              }
            />
            <StyledButton
              icon={<Trash color="red" size={16} />}
              onClick={() => deleteReview({id: review.id, token: user.token})}
            />
          </div>
        </div>
        <p className=" text-sm ">
          {formatDate(review.startDate)} → {formatDate(review.endDate)}
        </p>
        <p className=" text-sm ">{review.comment}</p>
      </div>
    </div>
  )
}

export default CardReview
