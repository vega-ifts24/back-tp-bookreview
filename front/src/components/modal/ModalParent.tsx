'use client'
import {X} from '@phosphor-icons/react'
import {useEffect} from 'react'

import StyledButton from '../buttons/StyledButton'

import {useModalStore} from '@/store/useModalStore'

const ModalParent = () => {
  const modal = useModalStore((state) => state.modal)
  const setModal = useModalStore((state) => state.setModal)

  useEffect(() => {
    return () => {
      setModal({visibilty: false, title: '', children: null})
    }
  }, []) // eslint-disable-line

  if (!modal.visibilty) return null

  return (
    <div className="transition-all fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-3/4 flex flex-col gap-5">
        <div className={' flex justify-between'}>
          <h2 className="text-2xl font-semibold text-titleColor ">{modal.title}</h2>
          <StyledButton
            extraStyles=" text-xl text-black px-0 py-0 "
            icon={<X color="black" size={16} />}
            onClick={() => setModal({visibilty: false, title: '', children: null})}
          />
        </div>
        {modal.children}
      </div>
    </div>
  )
}

export default ModalParent
