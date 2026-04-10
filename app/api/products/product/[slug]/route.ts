import { db } from "@/lib/db";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    // ✅ Validate slug
    if (!slug) {
      return new Response("Invalid slug", { status: 400 });
    }

    // ✅ Fetch product with relations (important for ecommerce)
    const product = await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
        user: true,
        hsnCode: true,
      },
    });

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error("🔥 API ERROR:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}