export interface Category {
  id: string
  title: string
  slug: string
  imageUrl?: string | null
  description?: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type CategoryFormData = {
  title: string
  description?: string
  imageUrl?: string
  isActive: boolean
}