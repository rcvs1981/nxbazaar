import Image from "next/image";
import Link from "next/link";

import HeroCarousel from "./HeroCarousel";
import SidebarCategories from "./SidebarCategories";

import advert from "@/public/adv.gif";

import { CircleDollarSign, FolderSync, HelpCircle } from "lucide-react";

import { getBanners } from "@/actions/banner";

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
}

export default async function Hero() {
  const banners: Banner[] = await getBanners("");

  return (
    <div className="grid grid-cols-12 gap-8 mb-6">
      
      <SidebarCategories />

      <div className="col-span-full sm:col-span-7 bg-blue-600 rounded-md overflow-hidden">
        <HeroCarousel banners={banners} />
      </div>

      <div className="col-span-2 hidden sm:block bg-white p-3 dark:bg-slate-800 rounded-lg">

        <Link href="#" className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div>
            <h2 className="uppercase text-sm">Help Center</h2>
            <p className="text-[0.6rem]">Guide to Customer Care</p>
          </div>
        </Link>

        <Link href="#" className="flex items-center gap-2 mb-3">
          <FolderSync className="w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div>
            <h2 className="uppercase text-sm">Easy Return</h2>
            <p className="text-[0.6rem]">Quick Return</p>
          </div>
        </Link>

        <Link
          href="/register-seller"
          className="flex items-center gap-2 mb-6"
        >
          <CircleDollarSign className="w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div>
            <h2 className="uppercase text-sm">Sell on Limi</h2>
            <p className="text-[0.6rem]">Millions of Visitors</p>
          </div>
        </Link>

        <Image
          src={advert}
          alt="advert"
          className="w-full rounded-lg"
          priority
        />
      </div>
    </div>
  );
}