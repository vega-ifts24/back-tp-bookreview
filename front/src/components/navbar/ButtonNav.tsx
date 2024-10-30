interface ButtonNavProps {
  title: string
  href: string
  handleOnClick?: () => void
}

export const ButtonNav = ({title, href, handleOnClick}: ButtonNavProps) => {
  return (
    <a
      className="text-[#44413b] uppercase text-xs min-h-10 flex items-center"
      href={href}
      onClick={handleOnClick}
    >
      <p className=" font-light text-xs ">{title}</p>
    </a>
  )
}
