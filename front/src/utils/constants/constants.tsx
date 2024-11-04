// File: utils/constants/constants.ts (or .js)

import {useGenderStore} from '@/store/useGenderStore'
import {useReviewsStore} from '@/store/useReviewsStore'
import {useBookStore} from '@/store/useBookStore'
import BookForm from '@/components/forms/bookForm'
import GenderForm from '@/components/forms/genderForm'
import BannerForm from '@/components/forms/bannersForm'
import RoleForm from '@/components/forms/roleForm'
import {useBannerStore} from '@/store/useBannerStore'
import {useRolesStore} from '@/store/useRolesStore'
import {useUsersStore} from '@/store/useUsersStore'
import UserForm from '@/components/forms/usersForm'

interface NavBarSectionI {
  id: number
  title: string
  href: string
  rol: number // 0: all, 1: admin, 2: user
  values?: any[]
  form?: any
  getData?: any
  onDelete?: any
  onEdit?: any
  onCreate?: any
}

export const DynamicNavBarSections: NavBarSectionI[] = [
  {id: 1, title: 'Inicio', href: '/', rol: 0},
  {id: 2, title: 'Mis reseñas', href: '/reviews', rol: 2},
  {
    id: 7,
    title: 'Libros',
    href: '/admin/books',
    rol: 1,
    form: <BookForm />,
    values: useBookStore.getState().books,
    getData: useBookStore.getState().getAllBooks,
    onDelete: useBookStore.getState().deleteBook,
    onEdit: useBookStore.getState().editBook,
    onCreate: () => Promise.resolve(), // Placeholder function
  },
  {
    id: 8,
    title: 'Géneros',
    href: '/admin/genders',
    rol: 1,
    form: <GenderForm />,
    values: useGenderStore.getState().genders,
    getData: useGenderStore.getState().getAllGenders,
    onDelete: useGenderStore.getState().deleteGender,
    onEdit: useGenderStore.getState().editGender,
    onCreate: useGenderStore.getState().createGender,
  },
  {
    id: 3,
    title: 'Reseñas',
    href: '/admin/reviews',
    rol: 1,
    values: useReviewsStore.getState().reviews,
    getData: useReviewsStore.getState().getAllReviews,
    onDelete: (id: number) => useReviewsStore.getState().deleteReview({id, token: ''}),
  },
  {
    id: 6,
    title: 'Banners',
    href: '/admin/banners',
    rol: 1,
    values: [],
    getData: useBannerStore.getState().getAllBanners,
    onDelete: useBannerStore.getState().deleteBanner,
    onEdit: useBannerStore.getState().editBanner,
    onCreate: useBannerStore.getState().createBanner,
    form: <BannerForm />,
  },
  {
    id: 4,
    title: 'Usuarios',
    href: '/admin/users',
    rol: 1,
    form: <UserForm />,
    values: useUsersStore.getState().users,
    getData: useUsersStore.getState().getAllUsers,
    onDelete: useUsersStore.getState().deleteUser,
    onEdit: useUsersStore.getState().editUser,
    onCreate: useUsersStore.getState().createUser,
  },
  {
    id: 5,
    title: 'Roles',
    href: '/admin/roles',
    rol: 1,
    form: <RoleForm />,
    values: useRolesStore.getState().roles,
    getData: useRolesStore.getState().getAllRoles,
    onDelete: useRolesStore.getState().deleteRole,
    onEdit: useRolesStore.getState().editRole,
    onCreate: useRolesStore.getState().createRole,
  },
]
