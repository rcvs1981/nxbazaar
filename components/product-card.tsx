"use client";

import { Product } from "@prisma/client";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        {product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-200 h-full flex items-center justify-center">
            <span>No image</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <p className="font-bold mt-2">₹{product.price}</p>
        
        <div className="mt-4 flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/marketplace/${product.id}`}>विवरण देखें</Link>
          </Button>
          <Button size="sm">कार्ट में डालें</Button>
        </div>
      </div>
    </div>
  );
}