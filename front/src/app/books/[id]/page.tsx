// eslint-disable
'use client'

import {useEffect, useState} from 'react'

import {useBookStore} from '@/store/useBookStore'
import {BookI} from '@/types/books'
import {ReviewI} from '@/types/reviews'
import {useReviewsStore} from '@/store/useReviewsStore'
import CardReviewDefault from '@/components/cards/cardReviewDefault'

const BookPage = ({params}: {params: {id: string}}) => {
  const [book, setBook] = useState<BookI | null>(null)
  const [reviews, setReviews] = useState<
    | (ReviewI & {
        first_name: string
        surname: string
        profile_image: string
      })[]
    | null
  >(null)
  const getBookById = useBookStore((state) => state.getBookById)
  const getReviewsByBook = useReviewsStore((state) => state.getReviewsByBook)

  const handleGetBookById = async () => {
    try {
      const responseData = await getBookById(Number(params.id))

      if (!responseData.error) {
        if (responseData?.body && responseData.body.length > 0) {
          setBook(responseData.body[0] as BookI)
        } else {
          setBook(null)
        }
      }
    } catch (error) {
      console.error('handleGetBookById => Error: ', error) // eslint-disable-line
    }
  }
  const handleGetReviewsByBook = async () => {
    try {
      const responseData = await getReviewsByBook({bookId: Number(params.id)})

      if (!responseData.error) {
        if (responseData?.body && responseData.body.length > 0) {
          setReviews(
            responseData.body as (ReviewI & {
              first_name: string
              surname: string
              profile_image: string
            })[],
          )
        }
      }
    } catch (error) {
      console.error('handleGetReviewsByBook => Error: ', error) // eslint-disable-line
    }
  }

  useEffect(() => {
    handleGetBookById()
    handleGetReviewsByBook()
  }, [params.id]) // eslint-disable-line

  return (
    <>
      {book && (
        <article className="flex gap-4 flex-wrap">
          <img
            alt={book.title}
            className="w-36 h-56 rounded-md bg-gray-200 object-cover "
            src={process.env.NEXT_PUBLIC_API_URL + book.imageLink}
          />
          <div>
            <h1 className="  text-lg font-medium">{book?.title}</h1>
            <p className=" italic ">{book?.author}</p>
            <p className="text-sm font-light">
              <span>Género: </span>
              {book?.gender_name}
            </p>
          </div>
        </article>
      )}
      {reviews && (
        <article>
          <h2 className="text-lg font-semibold">Reseñas</h2>
          <div>
            {reviews?.map((review) => <CardReviewDefault key={review.id} review={review} />)}
          </div>
        </article>
      )}
    </>
  )
}

export default BookPage
