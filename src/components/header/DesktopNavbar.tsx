"use client";
import React from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DesktopNavbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-6xl mx-auto justify-between items-center hidden lg:flex">
        <Link href={"/"}>
        <h1 className="text-3xl font-bold tracking-tighter">HN STORE</h1>
        </Link>
        <div>
          <ul className="flex gap-4 md:gap-6 items-center">
            <li className="text-black hover:text-gray-600 transition-colors duration-300">
              <Link href={"/shop"}>Shop</Link>
            </li>
            <li className="text-black hover:text-gray-600 transition-colors duration-300">
              <Link href={"/onsale"}>On Sale</Link>
            </li>
            <li className="text-black hover:text-gray-600 transition-colors duration-300">
              <Link href={"/#new-arrival"}>New Arrival</Link>
            </li>
            <li className="text-black hover:text-gray-600 transition-colors duration-300">
              <Link href={"/#brands"}>Brands</Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-12 items-center">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                name="query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your products..."
                className="bg-gray-100 pl-10 w-[25rem]"
              />
            </form>
            <Search size={18} className="absolute top-2 left-2 text-gray-500" />
          </div>
          <div className="flex gap-4">
            <Link href={"/cart"}>
              <ShoppingCart />
            </Link>
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
