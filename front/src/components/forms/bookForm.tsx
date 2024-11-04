'use client'
import {FormEvent, useEffect, useState} from 'react'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import {useGenderStore} from '@/store/useGenderStore'
import logo from '@/assets/logo.png'
import {useAuthStore} from '@/store/useAuthStore'
import {useBookStore} from '@/store/useBookStore'
import {useModalStore} from '@/store/useModalStore'
import {GenderI} from '@/types/gender'

interface BookFormProps {
  typeForm?: string
  prevData?: any
}

const BookForm = ({typeForm, prevData}: BookFormProps) => {
  const user = useAuthStore((state) => state.user)
  const getAllGenders = useGenderStore((state) => state.getAllGenders)
  const createBook = useBookStore((state) => state.createBook)
  const editBook = useBookStore((state) => state.editBook)
  const closeModal = useModalStore((state) => state.closeModal)
  const [formData, setFormData] = useState({
    title: prevData?.title ?? '',
    imageLink: prevData?.imageLink ?? undefined,
    author: prevData?.author ?? '',
    genderId: prevData?.genderId ?? 0,
  })
  const [genders, setGenders] = useState<GenderI[] | null>([])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (typeForm === 'edit') {
        await editBook({token: user.token, id: prevData.id, formData})
      } else {
        await createBook({token: user.token, formData})
      }
      closeModal()
      window.location.reload() // eslint-disable-line
    } catch (error) {
      console.error('An error occurred:', error) // eslint-disable-line
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllGenders({token: user.token})

        setGenders(data.body)
      } catch (error) {
        console.error('An error occurred:', error) // eslint-disable-line
      }
    }

    fetchData()
  }, []) // eslint-disable-line

  return (
    <article className=" flex flex-col gap-4 w-full  items-center">
      <form className="flex gap-4 flex-col w-full " id="BookForm" onSubmit={handleSubmit}>
        <div className=" flex gap-2 items-end">
          <img
            alt={`Imagen de perfil de ${formData.title}`}
            className="w-24 h-28 rounded-md bg-backgroundNavbar object-cover  self-center"
            src={
              typeof formData?.imageLink === 'string' && formData?.imageLink.includes('uploads')
                ? process.env.NEXT_PUBLIC_API_URL + formData?.imageLink
                : typeof formData?.imageLink === 'object'
                  ? URL.createObjectURL(formData?.imageLink)
                  : logo?.src
            }
          />
          <InputField
            id="imageLink"
            setter={setFormData}
            title="Imagen de perfil"
            type="file"
            valueSetter={formData}
          />
        </div>
        <InputField
          id="title"
          setter={setFormData}
          title="Título"
          type="text"
          valueSetter={formData}
        />
        <InputField
          id="author"
          setter={setFormData}
          title="Autor"
          type="text"
          valueSetter={formData}
        />
        <select
          className="w-full p-2 border border-gray-300 rounded-md
          focus:outline-none focus:border-blue-500"
          name="genderId"
          value={formData.genderId}
          onChange={(e) => setFormData({...formData, genderId: parseInt(e.target.value)})}
        >
          <option value="">Selecciona un género</option>
          {genders?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <StyledButton
          styleType="filled"
          text={typeForm === 'edit' ? 'Editar Libro' : 'Crear Libro'}
          type="submit"
        />
      </form>
    </article>
  )
}

export default BookForm
