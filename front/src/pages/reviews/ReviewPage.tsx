'use client'
import {Plus} from '@phosphor-icons/react'
import {useState} from 'react'

import StyledButton from '@/components/buttons/StyledButton'
import Reviews from '@/components/reviews/Reviews'
import ModalParent from '@/components/modal/ModalParent'
import ReviewForm from '@/components/forms/reviewForm'

const ReviewPage = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <article className="p-4 flex justify-between">
        <h1 className=" font-semibold text-lg text-titleColor">Mis reseñas</h1>
        <StyledButton
          extraStyles=" w-fit "
          icon={<Plus />}
          styleType="outlined"
          text="Nueva reseña"
          onClick={() => setOpenModal(true)}
        />
      </article>
      <Reviews />
      {openModal && (
        <ModalParent setterOpen={setOpenModal} title="Nueva reseña">
          <ReviewForm />
        </ModalParent>
      )}
    </>
  )
}

export default ReviewPage
