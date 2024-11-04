'use client'
import {List} from '@phosphor-icons/react/dist/ssr'
import {useState} from 'react'

import {ButtonNav} from './ButtonNav'

import {useAuthStore} from '@/store/useAuthStore'
import profile_image from '@/assets/default-profile.png'
import {DynamicNavBarSections} from '@/utils/constants/constants'

const Header = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = (): void => {
    logout()
  }

  return (
    <header className="fixed top-0 left-0 z-50 md:w-full p-4">
      <nav className="flex items-center justify-between bg-backgroundNavbar rounded-full px-4 py-4 md:py-2">
        {/* Hamburger Menu */}
        <button
          className="flex flex-col justify-between items-center w-6 h-5 cursor-pointer relative md:hidden"
          onClick={toggleMenu}
        >
          <List size={32} />
        </button>

        {/* Navigation Menu */}
        <div
          className={`fixed md:items-center top-[86px] w-[70vw] h-[calc(100vh-124px)] justify-between bg-backgroundNavbar rounded-lg p-6 transition-all duration-500 ease-in-out z-40 
            flex flex-col gap-2
            ${isMenuOpen ? ' left-4 ' : ' left-[-100vh] '}
            md:static md:flex-row md:h-fit md:p-0 md:w-full
            `}
        >
          <div className="flex gap-4 flex-col md:flex-row md:items-center">
            {DynamicNavBarSections?.map(
              (button) =>
                (button.rol === 0 || user.rolId === button.rol) && (
                  <ButtonNav key={button.id} href={button.href} title={button.title} />
                ),
            )}
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            {user?.id ? (
              <div className="relative">
                <button
                  className="flex gap-2 items-center"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                >
                  <img
                    alt={`Imagen de perfil de ${user.first_name}`}
                    className="w-8 h-8 rounded-full bg-background"
                    src={user?.profile_image || profile_image.src}
                  />
                  <p className="md:hidden text-sm font-light">
                    {user.first_name} {user.surname}
                  </p>
                </button>
                <div
                  className={` ${
                    isSettingsOpen ? 'md:block' : 'md:hidden'
                  } flex md:absolute md:-bottom-16 md:right-0 md:bg-background md:rounded-lg md:p-2 md:shadow-md md:w-36`}
                >
                  <ButtonNav
                    extraStyles="text-red-500"
                    handleOnClick={handleLogout}
                    href="/"
                    title="Cerrar sesión"
                  />
                </div>
              </div>
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
