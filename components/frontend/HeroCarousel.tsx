"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

type Banner = {
  imageUrl: string;
  title: string;
  link: string;
};

export default function HeroCarousel({ banners }: { banners: Banner[] }) {
  if (!banners?.length) return null;

  return (
    <Carousel
      opts={{
        loop: banners.length > 1,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="rounded-md overflow-hidden"
    >
      <CarouselContent>
        {banners.map((banner, i) => (
          <CarouselItem key={i}>
            <Link href={banner.link} className="block">
              <Image
                width={712}
                height={384}
                src={banner.imageUrl}
                className="w-full"
                alt={banner.title}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {banners.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}