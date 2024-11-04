export interface UserI {
  id: number
  first_name: string
  surname: string
  email: string
  password: string
  birth_date: string
  role: number
  createdAt: string
  updatedAt: string
  token: string
  rolId: number
  imageLink: string
}
export interface TokenI {
  token: string
}
