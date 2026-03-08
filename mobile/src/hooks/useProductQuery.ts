import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Product {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  productImages?: string[];
  description?: string;
  isActive: boolean;
  isWholesale: boolean;
  
  sku?: string;
  barcode?: string;
  qrCode?: string;
  productCode?: string;
  unit?: string;
  
  productPrice: number;
  salePrice: number;
  wholesalePrice?: number;
  wholesaleQty?: number;
  
  productStock?: number;
  tags?: string[];
  
  categoryId: string;
  subCategoryId?: string;
  userId: string;
  
  createdAt: string;
  updatedAt: string;
}

interface ProductResponse {
  success: boolean;
  data?: Product;
  error?: string;
}

interface ProductsResponse {
  success: boolean;
  data?: Product[];
  error?: string;
}

const API_BASE_URL = 'https://api.example.com'; // Replace with your API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await apiClient.get<ProductsResponse>('/api/products');
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch products');
      }
      return response.data.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await apiClient.get<ProductResponse>(`/api/products/${id}`);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch product');
      }
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}

// Helper functions for product data
export function calculateDiscount(productPrice: number, salePrice: number): number {
  if (productPrice <= salePrice) return 0;
  return Math.round(((productPrice - salePrice) / productPrice) * 100);
}

export function isInStock(product: Product): boolean {
  return product.isActive && (product.productStock ?? 0) > 0;
}

export function getProductPrice(product: Product): { display: string; original?: string } {
  const display = `₹${product.salePrice.toFixed(2)}`;
  const original = product.productPrice > product.salePrice 
    ? `₹${product.productPrice.toFixed(2)}`
    : undefined;
  return { display, original };
}
