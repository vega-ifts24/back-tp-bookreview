import {Star} from '@phosphor-icons/react'

import {ReviewFormI} from '@/types/reviews'

interface RatingProps {
  reviewData?: ReviewFormI
  setterReviewData?: (_: any) => void
  disabled?: boolean
  ratingValue?: number
}

const Rating = ({reviewData, setterReviewData, disabled = true, ratingValue = 0}: RatingProps) => {
  const changeRatingStyles = (starNumber: number) => {
    // starNumber es el valor de la estrella que se está evaluando
    // ratingValue es el valor de la estrella seleccionada
    if (starNumber <= ratingValue || starNumber <= (reviewData?.rating ?? 0)) {
      return '#ffe229'
    } else {
      return '#e0e0e0'
    }
  }

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <button
          key={starNumber}
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault()
            setterReviewData && setterReviewData({...reviewData, rating: starNumber})
          }}
        >
          <Star color={changeRatingStyles(starNumber)} size={20} weight="fill" />
        </button>
      ))}
    </div>
  )
}

export default Rating
