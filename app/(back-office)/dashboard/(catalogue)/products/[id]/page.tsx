import { db } from '@/lib/db';
import { getProduct } from '@/actions/product';
import ProductForm from '@/components/backoffice/Forms/ProductForm';
import PageHeader from '@/components/backoffice/PageHeader';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  // Fetch product
  const result = await getProduct(params.id);

  if (!result.success || !result.data) {
    return <div className="p-4">Product not found</div>;
  }

  // Fetch categories and subcategories
  const [categories, subcategories] = await Promise.all([
    db.category.findMany({ where: { isActive: true } }),
    db.subCategory.findMany({ where: { isActive: true } }),
  ]);

  return (
    <div className="w-full">
      <PageHeader title="Edit Product" />
      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm 
          updateData={result.data} 
          categories={categories} 
          subcategories={subcategories} 
        />
      </div>
    </div>
  );
}
