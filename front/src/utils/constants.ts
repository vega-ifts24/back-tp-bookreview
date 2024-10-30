interface NavBarSectionI {
  id: number
  title: string
  href: string
  rol: number
  handleOnClick?: () => void
}

export const NavBarSections: NavBarSectionI[] = [
  {
    id: 1,
    title: 'Inicio',
    href: '/',
    rol: 1,
  },
  {
    id: 2,
    title: 'Mis reseñas',
    href: '/reviews',
    rol: 2,
  },
]
