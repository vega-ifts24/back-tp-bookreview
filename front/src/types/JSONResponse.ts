export interface JSONResponse<T> {
  error: boolean
  status: number
  message: string
  body: T[] | null
}
