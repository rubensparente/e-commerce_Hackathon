export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category_id: number
  category_name?: string
  image_url?: string
  discount_percent?: number
  discounted_price?: number
}

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export interface LoginResponse {
  message: string
  token: string
  user: User
}