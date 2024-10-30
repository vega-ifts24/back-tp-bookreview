import {cloneElement} from 'react'

interface StyledButtonProps {
  text?: string
  onClick?: (_: any) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  extraStyles?: string
  styleType?: 'filled' | 'outlined' | 'text'
  href?: string
  [x: string]: any
  icon?: any
}

const StyledButton = ({
  text,
  onClick,
  type,
  disabled,
  extraStyles,
  styleType = 'text',
  href,
  icon,
  ...rest
}: StyledButtonProps) => {
  const changeStyle = () => {
    switch (styleType) {
      case 'filled':
        return 'bg-primary text-white hover:bg-tertiary hover:text-bodyColor'
      case 'outlined':
        return 'border border-primary text-bodyColor hover:bg-primary hover:text-white'
      default:
        return 'bg-transparent text-titleColor hover:underline hover:underline-offset-4    '
    }
  }

  return (
    <a href={href}>
      <button
        className={` w-full flex gap-2 items-center justify-center py-2 text-xs rounded uppercase transition-all px-3 ${changeStyle()}  ${extraStyles}`}
        disabled={disabled}
        type={type || 'button'}
        onClick={onClick}
        {...rest}
      >
        {icon && cloneElement(icon, {className: ''})}
        {text && <p>{text}</p>}
      </button>
    </a>
  )
}

export default StyledButton
