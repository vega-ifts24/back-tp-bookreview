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
