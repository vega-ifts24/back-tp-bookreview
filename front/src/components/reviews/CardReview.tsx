'use client'

import {ReviewI} from '@/types/reviews'

interface BookData {
  imageSrc: string
  title: string
}

interface CardReviewProps {
  bookData: BookData
  review: ReviewI
  archiveBook: (reviewId: number) => void
  editReview: (reviewId: number) => void
  deleteReview: (reviewId: number) => void
}

const CardReview = ({bookData, review, archiveBook, editReview, deleteReview}: CardReviewProps) => {
  return (
    <div className="book-review-container flex gap-5 p-4 border border-gray-300 rounded-lg mb-3 shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
      <img
        alt={`Portada de ${bookData.title}`}
        className="book-cover w-28 h-44 rounded-md bg-gray-200"
        src={bookData.imageSrc}
      />
      <div className="book-data-review flex-1 flex flex-col gap-1">
        <h4 className="text-lg font-semibold">{bookData.title}</h4>
        {/* <div className="starsReview flex items-center">{generateStarRating(review.rating)}</div> */}
        <p>
          <strong>Comentario:</strong> {review.description}
        </p>
        <p>{/* <strong>Fecha de inicio:</strong> {review.startDate} */}</p>
        <p>{/* <strong>Fecha de fin:</strong> {review.endDate} */}</p>
      </div>
      <div className="actions-container flex flex-col">
        <button
          className="archivar-review p-2 text-blue-500 hover:bg-gray-200 rounded"
          onClick={() => archiveBook(review.id)}
        >
          <i className="ph ph-bookmark-simple" />
        </button>
        <button
          className="edit-review p-2 text-blue-500 hover:bg-gray-200 rounded mt-2"
          onClick={() => editReview(review.id)}
        >
          <i className="ph ph-pencil-simple" />
        </button>
        <button
          className="delete-review p-2 text-red-500 hover:bg-gray-200 rounded mt-2"
          onClick={() => deleteReview(review.id)}
        >
          <i className="ph ph-trash" />
        </button>
      </div>
    </div>
  )
}

export default CardReview
