'use client'
import {List} from '@phosphor-icons/react/dist/ssr'
import {FC, useState} from 'react'

import {ButtonNav} from './ButtonNav'

import {NavBarSections} from '@/utils/constants/constants'
import {useAuthStore} from '@/store/useAuthStore'

const Header: FC = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = (): void => {
    logout()
  }

  return (
    <header className="fixed top-0 left-0 z-50 md:w-full p-4">
      <nav className="flex items-center justify-between bg-backgroundNavbar rounded-full px-4 py-4 md:py-2">
        {/* Menú hamburguesa */}
        <button
          className="flex flex-col justify-between items-center w-6 h-5 cursor-pointer relative md:hidden"
          onClick={toggleMenu}
        >
          <List size={32} />
        </button>

        {/* Menú de navegación */}
        <div
          className={`fixed top-[86px] w-[70vw] h-[calc(100vh-124px)] justify-between bg-backgroundNavbar rounded-lg p-6 transition-all duration-500 ease-in-out z-40 
            flex flex-col gap-2
            ${isMenuOpen ? ' left-4 ' : ' left-[-100vh] '}
            md:static md:flex-row md:h-fit md:p-0 md: md:w-full
            `}
        >
          <div className="flex gap-4 flex-col md:flex-row">
            {NavBarSections.map((button) => (
              <ButtonNav
                key={button.id}
                handleOnClick={button.handleOnClick}
                href={button.href}
                title={button.title}
              />
            ))}
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            {user?.id ? (
              <ButtonNav handleOnClick={handleLogout} href="/" title="Logout" />
            ) : (
              <>
                <ButtonNav href="/login" title="Iniciar sesión" />
                <ButtonNav href="/register" title="Registrarse" />
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
