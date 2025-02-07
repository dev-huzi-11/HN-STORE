"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import Casual from "@/components/casual/Casual";

const categories = ["T-Shirts", "Shorts", "Shirt", "Hoodie", "Jeans"];
const colors = [
  { name: "Green", colorClass: "bg-green-500" },
  { name: "Red", colorClass: "bg-red-500" },
  { name: "Yellow", colorClass: "bg-yellow-500" },
  { name: "Orange", colorClass: "bg-orange-500" },
  { name: "Sky Blue", colorClass: "bg-sky-500" },
  { name: "Blue", colorClass: "bg-blue-700" },
  { name: "Purple", colorClass: "bg-purple-500" },
  { name: "Pink", colorClass: "bg-pink-500" },
  { name: "White", colorClass: "bg-white" },
  { name: "Black", colorClass: "bg-black" },
];
const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "2X-Large",
  "3X-Large",
  "4X-Large",
];

const dressings = ["Casual", "Formal", "Party", "Gym"];

const Shop = () => {
  const [price, setPrice] = useState<number>(50);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleColorSelect = (colorName: string) => setSelectedColor(colorName);

  const handleSizeSelect = (size: string) => setSelectedSize(size);

  const toggleFilter = () => setIsFilterVisible(!isFilterVisible);

  return (
    <div className="w-full px-4 py-10 lg:py-20 mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Casual</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Main Layout */}
        <div className="lg:flex gap-2 lg:gap-6 my-10">
          {/* Filter Section */}
          <div
            className={`w-full lg:w-1/4 shadow-lg p-4 bg-white max-h-[80rem] ${
              isFilterVisible ? "block" : "hidden"
            } lg:block`}
          >
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold my-4">Filter</h1>
              <Image
                src="/icon/filter.svg"
                width={25}
                height={25}
                alt="Filter"
                onClick={toggleFilter}
                className="cursor-pointer"
              />
            </div>
            <div className="border-b-2 my-6"></div>
            {/* Categories */}
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center cursor-pointer"
                >
                  <span>{category}</span>
                  <Image
                    src="/icon/rightarrow.svg"
                    width={8}
                    height={8}
                    alt="Arrow"
                  />
                </div>
              ))}
            </div>

            {/* Price Slider */}
            <div className="my-6">
              <div className="flex justify-between my-2">
                <h2 className="text-lg font-semibold mb-2">Price</h2>
                <Image
                  src={"/icon/arrowup.svg"}
                  width={10}
                  height={10}
                  alt=""
                />
              </div>
              <Slider
                max={200}
                step={1}
                defaultValue={[price]}
                onValueChange={(value) => setPrice(value[0])}
              />
              <div className="text-right text-gray-500 mt-2">
                Selected Price: <span className="font-semibold">${price}</span>
              </div>
            </div>

            {/* Colors */}
            <div className="my-6">
              <div className="flex justify-between my-2">
                <h2 className="text-lg font-semibold mb-2">Colors</h2>
                <Image
                  src={"/icon/arrowup.svg"}
                  width={10}
                  height={10}
                  alt=""
                />
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {colors.map((color) => (
                  <div
                    key={color.name}
                    onClick={() => handleColorSelect(color.name)}
                    className={`h-9 w-9 rounded-full ${
                      color.colorClass
                    } flex items-center justify-center cursor-pointer shadow-md ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    }`}
                  >
                    {selectedColor === color.name && (
                      <Image
                        src="/icon/checkmark.svg"
                        width={15}
                        height={15}
                        alt="Selected"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="my-6">
              <div className="flex justify-between my-2">
                <h2 className="text-lg font-semibold mb-2">Size</h2>
                <Image
                  src={"/icon/arrowup.svg"}
                  width={10}
                  height={10}
                  alt=""
                />
              </div>
              <div className="flex flex-wrap gap-4">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`px-6 py-2 text-sm rounded-full hover:bg-black hover:text-white ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100 text-black border border-gray-300"
                    }`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Dress Style */}
            <div className="my-6">
              <div className="flex justify-between my-2">
                <h2 className="text-lg font-semibold mb-2">Dress Style</h2>
                <Image
                  src={"/icon/arrowup.svg"}
                  width={10}
                  height={10}
                  alt=""
                />
              </div>{" "}
              <div className="space-y-4">
                {dressings.map((dressing, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center cursor-pointer"
                  >
                    <span>{dressing}</span>
                    <Image
                      src="/icon/rightarrow.svg"
                      width={8}
                      height={8}
                      alt="Arrow"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Filter Button */}
            <Button className="w-full py-7 rounded-full mt-4">
              Apply Filter
            </Button>
          </div>

          {/* Product Section */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl font-bold">Casual</h1>
                {/* Filter Icon for Small Screens */}
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Showing 1-10 of 100 Products</p>
                <Image
                  src="/icon/filter.svg"
                  width={25}
                  height={25}
                  alt="Filter"
                  onClick={toggleFilter}
                  className="cursor-pointer lg:hidden"
                />
              </div>
            </div>
            <Casual />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
