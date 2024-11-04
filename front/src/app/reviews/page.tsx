'use client'

import {useRouter} from 'next/navigation'

import ReviewPage from '@/pages/reviews/ReviewPage'
import {isRol} from '@/utils/constants/isRol'
import {useAuthStore} from '@/store/useAuthStore'

const ReviewPageComponent = () => {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  if (isRol('user', user.rolId)) {
    return router.push('/')
  }

  return (
    <section className="flex flex-col gap-6 pt-4">
      <ReviewPage />
    </section>
  )
}

export default ReviewPageComponent
