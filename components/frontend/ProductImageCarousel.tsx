"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductImageCarousel({
  productImages = [],
  thumbnail,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = productImages?.length ? productImages : [thumbnail];

  return (
    <div className="col-span-3">

      {/* Main Slider */}

      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
        }}
        spaceBetween={10}
        navigation
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper.destroyed
              ? thumbsSwiper
              : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="rounded-lg overflow-hidden"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              src={image}
              alt="Product Image"
              width={600}
              height={600}
              className="w-full h-auto object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        className="mt-3"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              src={image}
              alt="Thumbnail"
              width={120}
              height={120}
              className="cursor-pointer rounded-md border"
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}