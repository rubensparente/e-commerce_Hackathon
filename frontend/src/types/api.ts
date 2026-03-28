// frontend/src/types/api.ts
export interface Product {
  id: number
  name: string
  description: string
  price: number | string
  stock: number
  category_id: number
  category_name?: string
  image_url?: string | null
  specifications?: string | Record<string, unknown>
  brand?: string | null
  warranty?: string | null
  discount_percent?: number
  discounted_price?: number | string
  active?: number | boolean
  created_at?: string
  updated_at?: string
}

export interface Category {
  id: number
  name: string
  description?: string
  icon?: string
  active?: number | boolean
  created_at?: string
}

export interface Offer {
  id: number
  product_id: number
  product_name?: string
  discount_percent: number
  original_price?: number
  discounted_price?: number
  start_date: string
  end_date: string
  active: number | boolean
  created_at?: string
}

export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'super_admin' | 'client'
  created_at?: string
}

export interface LoginResponse {
  message: string
  token: string
  user: User
}

export interface ApiError {
  error: string
}