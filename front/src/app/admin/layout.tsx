'use client'

import {useRouter} from 'next/navigation'
import {ReactNode, useEffect, useState} from 'react'

import {useAuthStore} from '@/store/useAuthStore'
import {isRol} from '@/utils/constants/isRol'

export default function Layout({children}: {children: ReactNode}) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (user.rolId) {
      if (isRol('admin', user.rolId)) {
        setIsAuthorized(true)
        console.log('User is authorized')
      } else {
        console.log('User is not authorized')
        router.push('/')
      }
    }
  }, [user, router])

  // Solo renderizar hijos si el usuario está autorizado
  return <>{isAuthorized && children}</>
}
