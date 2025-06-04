import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the type for your category data
interface CategoryData {
  title: string;
  slug: string;
  imageUrl: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const { title, slug, imageUrl, description }: CategoryData = await request.json();
    const newCategory: CategoryData = { title, slug, imageUrl, description };
    
    // Note: Console.log should be before the return statement
    console.log(newCategory);
    
    return NextResponse.json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      {
        message: "Failed to create Category",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}