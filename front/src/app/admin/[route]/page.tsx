'use client'

import {cloneElement, useEffect, useState} from 'react'
import {Plus} from '@phosphor-icons/react'

import Table from '@/components/table/Table'
import StyledButton from '@/components/buttons/StyledButton'
import {useModalStore} from '@/store/useModalStore'
import {DynamicNavBarSections} from '@/utils/constants/constants'

const Page = ({params}: {params: {route: string}}) => {
  const [routeData, setRouteData] = useState<any>({})
  const setModal = useModalStore((state) => state.setModal)

  useEffect(() => {
    // Encuentra la sección actual en función de la ruta
    const currentSection = DynamicNavBarSections?.find(
      (section) => section.href === `/admin/${params.route}`,
    )

    // Establece los datos de la ruta actual
    setRouteData(currentSection)
  }, [params.route])

  return (
    <div className="gap-4 flex flex-col">
      <div className="flex justify-between gap-2">
        <h2 className="text-titleColor font-semibold text-lg text-center">
          Administrador de {routeData.title?.toLowerCase()}
        </h2>
        {routeData.onCreate && (
          <StyledButton
            extraStyles=" w-fit "
            icon={<Plus />}
            styleType="outlined"
            text={`Nuevo ${routeData.title?.toLowerCase()}`}
            onClick={() =>
              setModal({
                visibilty: true,
                title: `Nuevo ${routeData.title?.toLowerCase()}`,
                children: cloneElement(routeData.form as any, {
                  typeForm: 'create',
                }),
              })
            }
          />
        )}
      </div>
      <Table data={routeData} />
    </div>
  )
}

export default Page
