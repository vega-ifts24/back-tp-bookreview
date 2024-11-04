'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'

import ReviewPage from '@/pages/reviews/ReviewPage'
import {isRol} from '@/utils/constants/isRol'
import {useAuthStore} from '@/store/useAuthStore'

const ReviewPageComponent = () => {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (user.rolId) {
      if (isRol('user', user.rolId)) {
        setIsAuthorized(true)
      } else {
        router.push('/')
      }
    }
  }, [user, router])

  return <section className="flex flex-col gap-6 pt-4">{isAuthorized && <ReviewPage />}</section>
}

export default ReviewPageComponent
