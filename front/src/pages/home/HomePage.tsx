'use client'
import {useEffect} from 'react'

import {useBannerStore} from '@/store/useBannerStore'
import {useBookStore} from '@/store/useBookStore'
import CoverBooks from '@/components/cards/CoverBooks'

const HomePage = () => {
  const getAllBooks = useBookStore((state) => state.getAllBooks)
  const books = useBookStore((state) => state.books)
  const getAllBanners = useBannerStore((state) => state.getAllBanners)
  const banners = useBannerStore((state) => state.banners)

  useEffect(() => {
    async function fetchAllData() {
      try {
        await getAllBanners()
        await getAllBooks()
      } catch (error) {
        console.error('Error al obtener los datos: ', error) // eslint-disable-line
      }
    }
    fetchAllData()
  }, []) // eslint-disable-line

  return (
    <>
      <article className=" flex flex-col justify-between gap-6">
        {banners.map(
          (banner) =>
            banner?.section === 'home' &&
            banner?.imageLink && (
              <img
                key={banner?.id}
                alt={banner.title}
                className="w-full object-cover rounded-md max-h-[65vh]"
                src={process.env.NEXT_PUBLIC_API_URL + banner.imageLink}
              />
            ),
        )}
        <h2 className="text-2xl font-semibold text-titleColor ">Los más destacados</h2>
        <div className="flex gap-4 overflow-auto">
          {books?.map((book) => <CoverBooks key={book.id} item={book} />)}
        </div>
      </article>
    </>
  )
}

export default HomePage
