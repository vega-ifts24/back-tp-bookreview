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
import Rating from '@/pages/reviews/Rating'
import {useModalStore} from '@/store/useModalStore'

interface ReviewFormProps {
  review?: ReviewI
}

const ReviewForm = ({review}: ReviewFormProps) => {
  const getAllBooks = useBookStore((state) => state.getAllBooks)
  const createReview = useReviewsStore((state) => state.createReview)
  const editReview = useReviewsStore((state) => state.editReview)

  const setModal = useModalStore((state) => state.setModal)
  const modal = useModalStore((state) => state.modal)

  const user = useAuthStore((state) => state.user)

  const [searchValue, setSearchValue] = useState({
    search: '',
  })
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
      coverLink: review?.coverLink || '',
      gender: review?.gender || '',
    },
  })

  console.log('reviewData: ', reviewData) // eslint-disable-line

  const handleGetAllBooks = async ({busqueda}: {busqueda: string}) => {
    const data = await getAllBooks({busqueda})

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
  console.log('reviewData: ', reviewData) // eslint-disable-line
  const handleSendReview = () => {
    if (review?.id) {
      editReview({token: user.token, id: review.id, review: reviewData})
    } else {
      createReview({token: user.token, review: reviewData})
    }
    setModal({...modal, visibilty: false})
  }

  useEffect(() => {
    if (searchValue.search.length > 2) {
      handleGetAllBooks({busqueda: searchValue.search})
    } else {
      setBooks([])
    }
  }, [searchValue.search]) // eslint-disable-line

  return (
    <div className=" transition-all gap-4">
      {!reviewData?.bookSelected.id && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semi-bold  text-center">¿Qué libro querés reseñar?</h3>

          <div className=" relative ">
            <InputField
              id="search"
              setter={setSearchValue}
              title="Buscar libro"
              type="text"
              valueSetter={searchValue}
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
              src={reviewData.bookSelected.coverLink}
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
