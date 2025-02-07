"use client";

import { useCart } from "@/components/context/CartContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart } = useCart();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const calculateSubtotal = () =>
    items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    const delivery = 150;
    return subtotal + delivery;
  };

  if (!isClient) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="w-full px-4 py-20 min-h-[50vh] flex">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center justify-center ">
          <h1 className="text-4xl font-bold ">Your Cart is Empty</h1>
          <Link
            href={"/shop"}
            className="bg-black text-white font-semibold text-xl px-4 py-2 rounded-lg"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

        <div className="lg:flex gap-6">
          <div className="flex-1">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="flex items-center justify-between border-b py-12 relative shadow-sm px-4 mb-2"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    width={80}
                    height={80}
                    alt={item.name}
                    className="rounded-lg"
                  />
                  <div>
                    <h2 className="md:text-lg text-sm font-semibold max-w-[13rem]">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">${item.price}</p>
                    <div className="flex gap-2 mt-1">
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{
                          backgroundColor: item.color,
                        }}
                      />
                      <p className="text-gray-500">{item.size}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-col md:flex-row">
                  <div className="gap-4 flex items-center">
                    <Button
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/3 bg-white shadow-lg p-6 rounded-lg mt-10 lg:mt-0 max-h-[20rem]">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <span>Price</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Delivery</span>
              <span>150</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between items-center mb-4 font-semibold">
              <span>Total</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full py-6 text-white bg-black rounded-full">
                Proceed to Checkout <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
