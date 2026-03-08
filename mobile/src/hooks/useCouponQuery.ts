import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';

// Configure axios for mobile
const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Coupon {
  id: string;
  title: string;
  couponCode: string;
  expiryDate: string;
  isActive: boolean;
  vendorId: string;
  createdAt: string;
  updatedAt: string;
  vendor?: {
    id: string;
    name?: string;
    email: string;
  };
}

export interface CouponsResponse {
  success: boolean;
  data?: Coupon[];
  error?: string;
}

export interface CouponResponse {
  success: boolean;
  data?: Coupon;
  error?: string;
}

export function useCoupons() {
  return useQuery<CouponsResponse>({
    queryKey: ['coupons'],
    queryFn: async () => {
      const response = await api.get('/coupons');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCoupon(id: string) {
  return useQuery<CouponResponse>({
    queryKey: ['coupon', id],
    queryFn: async () => {
      const response = await api.get(`/coupons/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

// Helper function to check if coupon is expired
export const isExpired = (expiryDate: string): boolean => {
  return new Date(expiryDate) < new Date();
};

// Helper function to get days remaining
export const getDaysRemaining = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};