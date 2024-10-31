'use client'
import {useEffect, useState} from 'react'
import {toast} from 'sonner'
import {Star} from '@phosphor-icons/react'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import {useBookStore} from '@/store/useBookStore'
import {BookI} from '@/types/books'
import {ReviewFormI} from '@/types/reviews'
import {useReviewsStore} from '@/store/useReviewsStore'
import {useAuthStore} from '@/store/useAuthStore'
import Rating from '@/pages/reviews/Rating'

const ReviewForm = () => {
  const getAllBooks = useBookStore((state) => state.getAllBooks)
  const postReview = useReviewsStore((state) => state.postReview)
  const user = useAuthStore((state) => state.user)
  const [searchValue, setSearchValue] = useState({
    search: '',
  })
  const [books, setBooks] = useState<BookI[]>([])
  const [reviewData, setReviewData] = useState<ReviewFormI>({
    rating: 0,
    comment: '',
    startDate: null,
    endDate: null,
    bookSelected: {} as BookI,
  })

  const handleGetAllBooks = async ({busqueda}: {busqueda: string}) => {
    const data = await getAllBooks({busqueda})

    if (data.error) {
      setBooks([])
      toast.error(data.message || 'Error al obtener los libros')
    } else {
      setBooks((data?.body || []) as BookI[])
    }
  }

  const handleSelectBook = (book: BookI) => {
    setReviewData({...reviewData, bookSelected: book})
    setBooks([])
  }

  const handleSendReview = () => {
    postReview({token: user?.token, review: reviewData})
  }

  useEffect(() => {
    if (searchValue.search.length > 2) {
      handleGetAllBooks({busqueda: searchValue.search})
    } else {
      setBooks([])
    }
  }, [searchValue.search])

  return (
    <div className=" transition-all gap-4">
      {!reviewData?.bookSelected.id && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semi-bold  text-center">¿Qué libro querés reseñar?</h3>

          <div className=" relative ">
            <InputField
              id="search"
              setter={setSearchValue}
              title="Buscar libro"
              type="text"
              value={searchValue.search}
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
          <form className=" transition-all flex flex-col gap-4 " id="review-form">
            {/* Puntaje */}
            <div className=" flex flex-col gap-1">
              <h3 className="text-lg font-semi-bold ">Puntaje</h3>

              <Rating disabled={false} reviewData={reviewData} setterReviewData={setReviewData} />
            </div>
            {/* Campo de comentario */}
            <div className=" flex flex-col gap-1">
              <h3 className="text-lg font-semi-bold ">Comentario</h3>
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                id="comment"
                name="comment"
                placeholder="Escribe tu reseña aquí..."
                rows={5}
              />
            </div>

            {/* Lapso de tiempo: Fecha inicio - Fecha fin */}
            <div className="date-inputs flex justify-between mb-4">
              <div className="date-div w-1/2 pr-2">
                <label className="block mb-1" htmlFor="start-date">
                  Fecha de inicio
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="start-date"
                  name="start-date"
                  type="date"
                />
              </div>
              <div className="date-div w-1/2 pl-2">
                <label className="block mb-1" htmlFor="end-date">
                  Fecha de fin
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  id="end-date"
                  name="end-date"
                  type="date"
                />
              </div>
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
