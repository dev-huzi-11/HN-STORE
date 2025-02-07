"use client";

import { useCart } from "@/components/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const CheckoutPage = () => {
  const { items } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const orderData = {
      ...formData,
      items,
    };
  
    console.log("Submitting Order:", orderData);
  
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);
  
      const result = await response.json();
      console.log("API Response:", result);
  
      if (response.ok) {
        alert("Order placed successfully!");
        router.push("/success");
      } else {
        alert(`Failed to place order: ${result.error}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("An error occurred while placing the order.");
    }
  };
  

  return (
    <div className="w-full min-h-screen py-12 px-2">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="max-w-5xl mx-auto py-10 px-4 flex gap-4 flex-col md:flex-row">
        <div className="mb-6 w-full">
          <h2 className="text-xl font-semibold">Your Order</h2>
          <ul>
            {items.map((item) => (
              <li
                key={`${item.id}-${item.color}-${item.size}`}
                className="border p-4 mb-2 rounded-lg shadow-sm flex gap-3"
              >
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.name}
                />
                <div>
                  <p className="font-semibold">
                    {item.name} (x{item.quantity})
                  </p>
                  <p>
                    Color: {item.color} | Size: {item.size}
                  </p>
                  <p>Price: ${item.price * item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="grid grid-cols-1 gap-4">
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
              required
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
            required
          />
          <div className="grid gap-4">
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
              required
            />
            <Input
              type="text"
              name="province"
              placeholder="Province"
              value={formData.province}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
              required
            />
            <Input
              type="number"
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full py-4 bg-black text-white rounded-md"
          >
            Place Order
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
