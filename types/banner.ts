export interface Banner {
  id: string;
  title: string;
  link?: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBannerInput {
  title: string;
  link?: string;
  imageUrl: string;
  isActive: boolean;
}

export interface UpdateBannerInput extends Partial<CreateBannerInput> {
  id: string;
}

export interface BannerResponse {
  success: boolean;
  data?: Banner;
  error?: string;
}

export interface BannersResponse {
  success: boolean;
  data?: Banner[];
  error?: string;
}