'use client'
import {useEffect, useState} from 'react'
import {Plus} from '@phosphor-icons/react'

import Table from '@/components/table/Table'
import {useBookStore} from '@/store/useBookStore'
import {BookI} from '@/types/books'
import StyledButton from '@/components/buttons/StyledButton'
import BookForm from '@/components/forms/bookForm'
import {useModalStore} from '@/store/useModalStore'

const BooksPage = () => {
  const getAllBooks = useBookStore((state) => state.getAllBooks)
  const resetValues = useBookStore((state) => state.resetValues)

  const [books, setBooks] = useState<BookI[]>([])
  const setModal = useModalStore((state) => state.setModal)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBooks({busqueda: ''})

      setBooks(data.body)
    }

    fetchData()

    return () => {
      resetValues()
    }
  }, [])

  return (
    <article className="w-full gap-4 flex flex-col">
      <div className="flex justify-between gap-2">
        <h1 className=" font-semibold text-lg text-titleColor">Libros</h1>
        <StyledButton
          extraStyles=" w-fit "
          icon={<Plus />}
          styleType="outlined"
          text="Nuevo libro"
          onClick={() => setModal({visibilty: true, title: 'Nuevo libro', children: <BookForm />})}
        />
      </div>
      {!books.length ? <p>Aún no hay libros</p> : <Table data={books} />}
    </article>
  )
}

export default BooksPage
