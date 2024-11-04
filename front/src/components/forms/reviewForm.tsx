'use client'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import {useBookStore} from '@/store/useBookStore'
import {BookI} from '@/types/books'
import {ReviewFormI, ReviewI} from '@/types/reviews'
import {useReviewsStore} from '@/store/useReviewsStore'
import {useAuthStore} from '@/store/useAuthStore'
import Rating from '@/pages/reviews/items/Rating'
import {useModalStore} from '@/store/useModalStore'

interface ReviewFormProps {
  review?: ReviewI
}

const ReviewForm = ({review}: ReviewFormProps) => {
  const getAllBooks = useBookStore((state) => state.getAllBooks)
  const createReview = useReviewsStore((state) => state.createReview)
  const editReview = useReviewsStore((state) => state.editReview)
  const setFilterBooks = useBookStore((state) => state.setFilterBooks)
  const filterBooks = useBookStore((state) => state.filterBooks)
  const resetBooksValues = useBookStore((state) => state.resetBooksValues)
  const setModal = useModalStore((state) => state.setModal)
  const modal = useModalStore((state) => state.modal)

  const user = useAuthStore((state) => state.user)

  const [books, setBooks] = useState<BookI[]>([])
  const [reviewData, setReviewData] = useState<ReviewFormI>({
    rating: review?.rating || 0,
    comment: review?.comment || '',
    startDate: review?.startDate.split('T')[0] || '',
    endDate: review?.endDate.split('T')[0] || '',
    bookSelected: {
      id: review?.bookId || null,
      title: review?.title || '',
      author: review?.author || '',
      imageLink: review?.imageLink || '',
      gender: review?.gender || '',
    },
  })

  const handleGetAllBooks = async () => {
    const data = await getAllBooks()

    if (data.error) {
      setBooks([])
      toast.error(data.message || 'Error al obtener los libros')
    } else {
      setBooks(data.body ? data.body.flat() : [])
    }
  }

  const handleSelectBook = (book: BookI) => {
    setReviewData({...reviewData, bookSelected: book})
    setBooks([])
  }
  const handleSendReview = () => {
    if (review?.id) {
      editReview({token: user.token, id: review.id, review: reviewData})
    } else {
      createReview({token: user.token, review: reviewData})
    }
    setModal({...modal, visibilty: false})
  }

  console.log('filterBooks.search: ', filterBooks.search) // eslint-disable-line
  useEffect(() => {
    if (filterBooks.search.length > 2) {
      handleGetAllBooks()
    } else {
      setBooks([])
    }
  }, [filterBooks.search]) // eslint-disable-line

  useEffect(() => {
    return () => {
      resetBooksValues()
    }
  }, []) // eslint-disable-line

  return (
    <div className=" transition-all gap-4">
      {!reviewData?.bookSelected.id && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semi-bold  text-center">¿Qué libro querés reseñar?</h3>

          <div className=" relative ">
            <InputField
              id="search"
              setter={setFilterBooks}
              title="Buscar libro"
              type="text"
              valueSetter={filterBooks}
            />
            {/* resultados */}
            {books.length > 0 && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1">
                {books.map((book) => (
                  <li
                    key={book.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectBook(book)}
                  >
                    {book.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {reviewData?.bookSelected.id && (
        <>
          <div className="flex gap-3 ">
            <img
              alt={reviewData.bookSelected.title}
              className="w-16 h-8 rounded-md"
              src={reviewData.bookSelected.imageLink}
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semi-bold">{reviewData.bookSelected.title}</h3>
              <p className="text-sm">{reviewData.bookSelected.author}</p>
            </div>
          </div>
          <form className=" transition-all flex flex-col gap-4 pt-4 " id="review-form">
            {/* Puntaje */}

            <Rating disabled={false} reviewData={reviewData} setterReviewData={setReviewData} />
            {/* Campo de comentario */}
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              id="comment"
              name="comment"
              placeholder="Escribe tu reseña aquí..."
              rows={5}
              value={reviewData.comment}
              onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
            />

            {/* Lapso de tiempo: Fecha inicio - Fecha fin */}
            <div className="date-inputs flex justify-between w-full gap-4">
              <InputField
                id="startDate"
                setter={setReviewData}
                title="Fecha de inicio"
                type="date"
                valueSetter={reviewData}
              />
              <InputField
                id="endDate"
                setter={setReviewData}
                title="Fecha de fin"
                type="date"
                valueSetter={reviewData}
              />
            </div>

            {/* Botón de envío */}
            <StyledButton styleType="filled" text="Enviar reseña" onClick={handleSendReview} />
          </form>
        </>
      )}
    </div>
  )
}

export default ReviewForm
