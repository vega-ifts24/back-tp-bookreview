import {ChangeEvent} from 'react'

interface InputFieldProps {
  id: string
  title: string
  type?: string
  value: string
  setter: (value: any) => void
  valueSetter: any
}

const InputField = ({
  id,
  title,
  type = 'text',
  value = '',
  setter,
  valueSetter,
}: InputFieldProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setter({
      ...valueSetter,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <div className="relative ">
      <input
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border  appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
        id={id}
        placeholder=" "
        type={type}
        value={value}
        onChange={handleOnChange}
      />
      <label
        className="absolute text-sm text-brown-500 bg-background  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-yellow-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        htmlFor="floating_outlined"
      >
        {title}
      </label>
    </div>
  )
}

export default InputField
