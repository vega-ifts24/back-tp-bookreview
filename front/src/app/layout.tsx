import {ReactNode} from 'react'
import {Montserrat} from 'next/font/google'
import {Metadata} from 'next'
import {Toaster} from 'sonner'

import Footer from '@/components/Footer'
import Header from '@/components/navbar/Header'
import ModalParent from '@/components/modal/ModalParent'
import './globals.css'

const montserrat = Montserrat({
  display: 'swap',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "Booker's",
  description: "Booker's es una página web para dejar reseñas de libros",
  keywords: 'libros, reseñas, bookers, valoracion, lectura, libros, bookers',
  icons: {
    icon: ['/favicon.ico?v=1'],
  },
}

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html className={`${montserrat.className} scroll-smooth`} lang="es">
      <head>
        <link href="/favicon.ico?v=1" rel="icon" />
      </head>

      <body className="w-full pt-16 px-6 flex flex-col items-center gap-6 bg-background text-bodyColor md:pt-24 ">
        <Header />
        <main className="min-h-screen w-full px-6 text-bodyColor ">{children}</main>
        <Toaster closeButton richColors position="bottom-right" />
        <ModalParent />
        <Footer />
      </body>
    </html>
  )
}
