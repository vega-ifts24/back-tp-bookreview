'use client'
import {ChangeEvent, FormEvent, useEffect, useState} from 'react'

import InputField from '../inputs/InputField'
import StyledButton from '../buttons/StyledButton'

import logo from '@/assets/logo.png'
import {useAuthStore} from '@/store/useAuthStore'
import {useBannerStore} from '@/store/useBannerStore'
import {useModalStore} from '@/store/useModalStore'

interface BannerFormProps {
  typeForm?: string
  prevData?: any
}

const BannerForm = ({typeForm, prevData}: BannerFormProps) => {
  const user = useAuthStore((state) => state.user)
  const createBanner = useBannerStore((state) => state.createBanner)
  const editBanner = useBannerStore((state) => state.editBanner)
  const closeModal = useModalStore((state) => state.closeModal)

  const [formData, setFormData] = useState({
    title: '' || prevData?.title,
    section: '' || prevData?.section,
    imageLink: null || prevData?.imageLink,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (typeForm === 'edit') {
        await editBanner({token: user.token, id: prevData.id, formData})
      } else {
        await createBanner({token: user.token, formData})
      }
      closeModal()
      window.location.reload()
    } catch (error) {
      console.error('An error occurred:', error) // eslint-disable-line
    }
  }

  return (
    <article className="flex flex-col gap-4 w-full items-center">
      <form className="flex gap-4 flex-col w-full" id="BannerForm" onSubmit={handleSubmit}>
        <InputField
          id="title"
          setter={setFormData}
          title="Título del Banner"
          type="text"
          valueSetter={formData}
        />
        <InputField
          id="section"
          setter={setFormData}
          title="Sección"
          type="text"
          valueSetter={formData}
        />
        <div className=" flex flex-col gap-2 items-end">
          <img
            alt={`Imagen de perfil de ${formData.title}`}
            className="w-full h-28 rounded-md bg-backgroundNavbar object-cover  self-center"
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
        <StyledButton styleType="filled" text="Crear banner" type="submit" />
      </form>
    </article>
  )
}

export default BannerForm
