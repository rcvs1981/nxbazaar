"use client";

import React from "react";
import Product from "./Product";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

type Props = {
  products: any[];
  isMarketPage?: boolean;
};

export default function CategoryCarousel({
  products,
  isMarketPage = false,
}: Props) {
  if (!products?.length) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {products.map((product, i) => (
          <CarouselItem
            key={i}
            className={`
            basis-1/2
            md:basis-1/3
            lg:${isMarketPage ? "basis-1/3" : "basis-1/4"}
            px-4
          `}
          >
            <Product product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}