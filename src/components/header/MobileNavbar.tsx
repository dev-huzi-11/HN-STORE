"use client";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();

    const query = searchQuery.trim();
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full py-6 px-4 relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative z-50">
        <Button variant={"ghost"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu />
        </Button>
        <Link href={"/"}>
          <h1 className="text-2xl font-bold tracking-tighter">HN STORE</h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button
            variant={"secondary"}
            onClick={() => setSearchBar(!searchBar)}
          >
            <Search />
          </Button>
          <Link href={"/cart"} className="cursor-pointer">
            <ShoppingCart />
          </Link>
          <User />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 left-0 w-full min-h-screen bg-white z-50 px-8 py-6 shadow-lg 
          transition-transform duration-300 ease-in-out 
          ${
            isMenuOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-tighter">HN STORE</h1>
          <Button onClick={() => setIsMenuOpen(false)} variant={"secondary"}>
            X
          </Button>
        </div>
        <ul className="flex flex-col gap-6">
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/onSale">On Sale</Link>
          </li>
          <li>
            <Link href="/#new-arrival">New Arrival</Link>
          </li>
          <li>
            <Link href="/#brands">Brands</Link>
          </li>
        </ul>
      </div>

      {/* Search Bar */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-lg z-40 p-4 transition-transform duration-300 ease-in-out 
          ${
            searchBar
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Search Products</h2>
          <Button variant={"secondary"} onClick={() => setSearchBar(false)}>
            X
          </Button>
        </div>
        <div className="relative">
          <Search size={18} className="absolute top-2 left-3 text-gray-400" />
          <form
           onSubmit={() => handleQuery}
           className="flex items-center gap-4 mb-6 mt-10">
            <Input
              type="search"
              name="query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="pl-10"
            />
            <Button type="submit" variant={"secondary"}>Search</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
