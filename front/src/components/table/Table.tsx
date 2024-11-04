import {cloneElement, useEffect, useState} from 'react'
import {PencilSimple, Trash} from '@phosphor-icons/react'
import {JSX} from 'react'

import StyledButton from '../buttons/StyledButton'

import logo from '@/assets/logo.png'
import {useAuthStore} from '@/store/useAuthStore'
import {useModalStore} from '@/store/useModalStore'
import {formatDate} from '@/utils/constants/formatDate'

interface TableProps {
  data: {
    id: number
    title: string
    href: string
    rol: number
    form?: JSX.Element // Formulario opcional
    values?: any[]
    getData: ({token}: {token: string}) => Promise<any> // Cambia según el tipo de retorno
    onDelete?: ({id, token}: {id: number; token: string | undefined}) => Promise<any>
    onEdit?: ({id, token}: {id: number; token: string | undefined}) => Promise<any>
  }
}
function Table({data}: TableProps) {
  const [loading, setLoading] = useState(true)
  const user = useAuthStore((state) => state.user)
  const setModal = useModalStore((state) => state.setModal)
  const [rows, setRows] = useState<any[]>([])
  const fetchData = async () => {
    setLoading(true)
    try {
      const responseData = await data.getData({
        token: user.token,
      })

      setRows(responseData?.body)
    } catch (error) {
      console.error('Error al obtener los datos: ', error) // eslint-disable-line
      // Manejo de errores (opcional)
    } finally {
      setLoading(false)
    }
  }

  //Valido si es type date pasandolo a date sino se puede no es
  const isTypeDate = (column: string) => {
    if (!column) return false
    if (typeof column !== 'string') return false
    if (column.length < 10) return false

    const date = new Date(column)

    return date instanceof Date && !isNaN(date.getTime())
  }

  // orden de columnas por id,imageLink, el resto de columnas, createdAt y updatedAt, y acciones
  const orderColumns = (columns: string[]) => {
    const columnsOrder = ['id', 'imageLink']
    const columnsEnd = ['createdAt', 'updatedAt']
    const columnsMiddle = columns.filter(
      (column) => !columnsOrder.includes(column) && !columnsEnd.includes(column),
    )

    return [...columnsOrder, ...columnsMiddle, ...columnsEnd]
  }

  useEffect(() => {
    if (data?.getData) {
      fetchData()
    }
  }, [data]) // eslint-disable-line

  const columns = rows?.length ? Object.keys(rows[0]) : [] // Obtener columnas del primer objeto

  return (
    <div className="overflow-x-auto">
      {rows?.length === 0 ? (
        <p>No hay datos</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              {orderColumns(columns).map((column) => (
                <th key={column} className="py-3 px-6 text-left">
                  {column}
                </th>
              ))}
              {(data?.onEdit || data?.onDelete) && (
                <th className="py-3 px-6 text-left sticky right-0 bg-gray-100 z-10">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {loading ? (
              <tr>
                <td className="py-3 text-center" colSpan={columns.length + 1}>
                  Cargando...
                </td>
              </tr>
            ) : (
              rows?.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  {orderColumns(columns).map((column) => (
                    <td key={column} className="py-3 px-6 text-left whitespace-nowrap">
                      {column === 'imageLink' ? (
                        <>
                          <img
                            alt={`Imagen de perfil de ${item.title}`}
                            className={`${
                              data.title === 'Banners'
                                ? ' w-full h-44 '
                                : data.title === 'Usuarios'
                                  ? ' w-20 h-20 rounded-full '
                                  : ' w-36 h-56 '
                            }  rounded-md bg-backgroundNavbar object-cover  self-center`}
                            src={process.env.NEXT_PUBLIC_API_URL + item[column] || logo?.src}
                          />
                          <a
                            href={process.env.NEXT_PUBLIC_API_URL + item[column]}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {process.env.NEXT_PUBLIC_API_URL + item[column]}
                          </a>
                        </>
                      ) : // Si es tipo fecha y es necesario formatear (puede ser cualquie columna)
                      isTypeDate(item[column]) ? (
                        formatDate(item[column])
                      ) : (
                        item[column]
                      )}
                    </td>
                  ))}
                  {(data?.onEdit || data?.onDelete) && (
                    <td className="text-left sticky right-0 bg-white z-10">
                      <div className="border-l-2 flex items-center space-x-4 py-3 px-6">
                        {data?.onEdit && (
                          <StyledButton
                            icon={<PencilSimple color="blue" size={16} />}
                            onClick={() =>
                              setModal({
                                visibilty: true,
                                title: `Editar ${item.title}`,
                                children: cloneElement(data.form as any, {
                                  typeForm: 'edit',
                                  prevData: item,
                                }),
                              })
                            }
                          />
                        )}
                        {data?.onDelete && (
                          <StyledButton
                            icon={<Trash color="red" size={16} />}
                            onClick={async () => {
                              if (data?.onDelete) {
                                await data.onDelete({
                                  id: item.id,
                                  token: user.token,
                                })
                              }
                              window.location.reload() // eslint-disable-line
                            }}
                          />
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Table
