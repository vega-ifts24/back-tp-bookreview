import {BookI} from './books'

export interface ReviewI {
  id: number
  userId: number
  bookId: number
  comment: string
  rating: number
  startDate: string
  endDate: string
  archived: boolean
  title: string
  coverLink: string
  author: string
  gender: string
}

export interface ReviewFormI {
  rating: number
  comment: string
  startDate: string
  endDate: string
  bookSelected: BookI
}
