import {BookI} from './books'

export interface ReviewI {
  id: number
  userId: number
  bookId: number
  description: string
  rating: number
  startDate: Date
  endDate: Date
  archived: boolean
}

export interface ReviewFormI {
  rating: number
  comment: string
  startDate: Date | null
  endDate: Date | null
  bookSelected: BookI
}
