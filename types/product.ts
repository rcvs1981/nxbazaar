

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
  
  gstId?: string;
  hsnId?: string;
  categoryId: string;
  subCategoryId?: string;
  userId: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  data?: Product;
  error?: string;
  message?: string;
}

export interface ProductsResponse {
  success: boolean;
  data?: Product[];
  error?: string;
  message?: string;
}

export interface ProductsDeleteResponse {
  success: boolean;
  message?: string;
  error?: string;
  deletedCount?: number;
}
