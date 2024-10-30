'use client'
import React, {useState} from 'react'

import InputField from '../inputs/InputField'

const ReviewForm: React.FC = () => {
  const [searchValue, setSearchValue] = useState({
    search: '',
  })
  const [bookData, setBookData] = useState<{title?: string; coverUrl?: string}>({})

  return (
    <>
      <h3 className="text-xl font-semi-bold  text-center">¿Qué libro querés reseñar?</h3>
      <InputField
        id="search"
        setter={setSearchValue}
        title="Buscar libro"
        type="text"
        value={searchValue.search}
        valueSetter={searchValue}
      />

      {bookData.title && (
        <div className="book-data flex items-center mb-4">
          <img
            alt="Book Cover"
            className="book-cover w-28 h-44 rounded-md"
            src={bookData.coverUrl}
          />
          <div className="ml-4">
            <h4 className="font-semibold">Buscá el libro que querés reseñar</h4>
            <p>{bookData.title}</p>
          </div>
        </div>
      )}

      <form id="review-form" style={{display: bookData.title ? 'block' : 'none'}}>
        {/* Puntaje */}
        <div className="rating-container mb-4">
          <p className="font-semibold">Puntaje</p>
          <div className="stars-container flex">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="relative">
                <input className="star hidden" id={`star${star}`} type="checkbox" />
                <label className="star-label text-2xl cursor-pointer" htmlFor={`star${star}`}>
                  &#9733;
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Campo de comentario */}
        <div className="textAreaDiv mb-4">
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
        <button
          className="filledBtn w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          type="submit"
        >
          PUBLICAR
        </button>
      </form>
    </>
  )
}

export default ReviewForm
