import {ChangeEvent} from 'react'

interface InputFieldProps {
  id: string
  title: string
  type?: string
  setter: (value: any) => void
  valueSetter: any
}

const InputField = ({id, title, type = 'text', setter, valueSetter}: InputFieldProps) => {
  // eslint-disable-next-line
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'file' && e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      setter({
        ...valueSetter,
        [id]: file,
      })

      return
    }

    setter({
      ...valueSetter,
      [id]: e.target.value,
    })
  }

  return (
    <div className="relative w-full">
      <input
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
        id={id}
        placeholder=" "
        type={type}
        value={type === 'file' ? valueSetter[id]?.file : valueSetter[id]}
        onChange={handleOnChange}
      />
      <label
        className="absolute text-sm text-brown-500 bg-background duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        htmlFor={id}
      >
        {title}
      </label>
    </div>
  )
}

export default InputField
