'use client'
import {Plus} from '@phosphor-icons/react'

import StyledButton from '@/components/buttons/StyledButton'
import Reviews from '@/components/reviews/Reviews'
import ReviewForm from '@/components/forms/reviewForm'
import {useModalStore} from '@/store/useModalStore'

const ReviewPage = () => {
  const setModal = useModalStore((state) => state.setModal)

  return (
    <>
      <article className=" flex justify-between gap-2">
        <h1 className=" font-semibold text-lg text-titleColor">Mis reseñas</h1>
        <StyledButton
          extraStyles=" w-fit "
          icon={<Plus />}
          styleType="outlined"
          text="Nueva reseña"
          onClick={() =>
            setModal({visibilty: true, title: 'Nueva reseña', children: <ReviewForm />})
          }
        />
      </article>
      <Reviews />
    </>
  )
}

export default ReviewPage
