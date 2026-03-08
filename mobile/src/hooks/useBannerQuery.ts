import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Configure axios for mobile
const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Banner {
  id: string;
  title: string;
  link?: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BannersResponse {
  success: boolean;
  data?: Banner[];
  error?: string;
}

export function useBanners(activeOnly?: boolean) {
  return useQuery<BannersResponse>({
    queryKey: ['banners', activeOnly],
    queryFn: async () => {
      const params = activeOnly ? { active: 'true' } : {};
      const response = await api.get('/banners', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBanner(id: string) {
  return useQuery<BannersResponse>({
    queryKey: ['banner', id],
    queryFn: async () => {
      const response = await api.get(`/banners/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}