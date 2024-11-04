import {ReactNode} from 'react'
import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from 'zustand/middleware'

export interface ModalStoreI {
  modal: {
    visibilty: boolean
    title: string
    children: ReactNode
  }
  setModal: (modal: {visibilty: boolean; title: string; children: ReactNode | null}) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStoreI>()(
  devtools(
    persist<ModalStoreI>(
      (set) => ({
        modal: {
          visibilty: false,
          title: '',
          children: null,
        },
        setModal: (modal) => {
          set({modal})
        },
        closeModal: () => {
          set({modal: {visibilty: false, title: '', children: null}})
        },
      }),
      {
        name: 'modal-storage',
        storage: createJSONStorage(() => localStorage), // eslint-disable-line
      },
    ),
  ),
)
