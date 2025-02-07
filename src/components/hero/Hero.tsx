"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Brands from "./Brands";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="bg-[#F2F0F1] min-h-screen w-full py-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="w-full px-4">
          <h2 className="uppercase text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-black max-w-4xl md:w-fit">
            Find Clothes that matches your style
          </h2>
          <p className="text-xl text-gray-500 max-w-xl my-6">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Button
            onClick={() => router.push("/shop")}
            className="px-16 py-8 rounded-full hover:bg-white hover:text-black border-black border-2 transition-colors duration-300 text-base w-full md:w-fit"
          >
            Shop Now
          </Button>
          <div className="gap-8 mt-12 flex flex-wrap justify-center md:justify-start">
            <div className="text-center">
              <div className="font-bold text-xl lg:text-2xl">200+</div>
              <div className="text-sm text-gray-600">International Brands</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl lg:text-2xl">2,000+</div>
              <div className="text-sm text-gray-600">High-Quality Products</div>
            </div>
            <div className="text-center ">
              <div className="font-bold text-xl lg:text-2xl">30,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[60rem] lg:h-[40rem]">
          <Image
            src="/store/hero-ecom.jpg"
            alt="Fashion Models"
            fill
            className="object-cover lg:object-contain lg:object-right-top"
            priority
          />
          <div className="absolute top-8 right-8 text-black">
            <StarIcon className="w-10 h-10" />
          </div>
          <div className="absolute bottom-1/3 left-8">
            <StarIcon className="w-8 h-8" />
          </div>
        </div>
      </div>
      <Brands />
    </div>
  );
};

export default Hero;

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}
