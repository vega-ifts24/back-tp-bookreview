import {X} from '@phosphor-icons/react'
import {ReactNode} from 'react'

import StyledButton from '../buttons/StyledButton'

interface ModalParentProps {
  setterOpen: (_: boolean) => void
  children: ReactNode
  title: string
}

const ModalParent = ({setterOpen, children, title}: ModalParentProps) => {
  return (
    <div className="transition-all fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-1/2 flex flex-col gap-5">
        <div className={' flex justify-between'}>
          <h2 className="text-2xl font-semibold text-titleColor ">{title}</h2>
          <StyledButton
            extraStyles=" text-xl text-black px-0 py-0 "
            icon={<X />}
            onClick={() => setterOpen(false)}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default ModalParent
