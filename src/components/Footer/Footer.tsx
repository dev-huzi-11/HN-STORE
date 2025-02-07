"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Mail, Twitter, Facebook, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    setEmail("");
  };

  // Ensure dynamic content is rendered only on the client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className="bg-[#F0F0F0] text-black py-10 mt-20">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-around items-center bg-black text-white px-6 py-6 rounded-3xl mt-[-110px] mb-10">
          <h1 className="text-[32px] md:text-[40px] font-bold text-center md:text-left max-w-lg">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h1>
          <form onSubmit={handleSubmit} className="w-full md:w-auto mt-8 md:mt-0">
            <div className="relative w-full md:w-auto">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                className="pl-10 pr-4 py-2 rounded-full w-full md:w-[300px] text-black bg-white focus:ring-2 focus:ring-gray-400"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="w-full md:w-[300px] bg-white text-black mt-4 hover:bg-gray-100 rounded-full py-4">
              Subscribe to Newsletter
            </Button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Shop.Co Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">HN STORE</h2>
            <p className="text-gray-400 mb-8 max-w-lg">
              We have clothes that suit your style and that you&apos;re proud to
              wear. From women to men.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 bg-white hover:text-gray-600"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 bg-white hover:text-gray-600"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 bg-white hover:text-gray-600"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 bg-white hover:text-gray-600"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Other Links */}
          <div>
            <h3 className="text-xl font-semibold mb-8">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Career
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-8">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-8">FAQ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Manage Deliveries
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Orders
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Payment
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-8">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Free eBooks
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  Development Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  How-To Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  YouTube Playlist
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ensure this section is rendered consistently */}
        {isClient && (
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 mt-10">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 HN STORE. All rights reserved.
            </p>

            <div className="flex justify-center md:justify-end w-[20rem] h-[3rem]">
              <Image
                src="/store/bank-card.png"
                width={200}
                height={300}
                quality={100}
                alt="Cards"
                className="object-contain w-auto h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;