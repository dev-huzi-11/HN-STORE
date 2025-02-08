"use client";

import React, { Suspense, useEffect, useState } from "react";
import { fetchOrderDetails } from "@/lib/fetchOrders";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    color: string;
    size: string;
    image: string;
  }[];
}

const SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

const AdminPanelContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const key = searchParams.get("key");

    if (key === SECRET_KEY) {
      setIsAuthorized(true);
    }
    setAuthChecked(true);
  }, [searchParams]);

  useEffect(() => {
    if (authChecked && !isAuthorized) {
      router.replace("/");
    }
  }, [authChecked, isAuthorized, router]);

  useEffect(() => {
    if (isAuthorized) {
      const getOrders = async () => {
        try {
          const data = await fetchOrderDetails();
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };

      getOrders();
    }
  }, [isAuthorized]);

  if (!hydrated) return null;
  if (!authChecked) return <div className="text-center py-20 text-xl">Checking authorization...</div>;
  if (!isAuthorized) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Admin Panel - Orders</h1>

      <div className="overflow-x-auto">
        <Table className="w-full min-w-[600px]">
          <TableCaption>Recent Orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={4}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  </TableRow>
                ))
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="whitespace-nowrap">
                    <span className="font-semibold">
                      {order.firstName} {order.lastName}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{order.email}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {order.address}, {order.city}, {order.province} - {order.zipCode}
                  </TableCell>
                  <TableCell>
                    {order.items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center space-x-2 border-b py-2">
                        <div className="w-16 h-16 relative">
                          <Image src={item.image} alt={item.name} fill className="rounded object-cover" />
                        </div>
                        <div className="text-center sm:text-left">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm">Qty: {item.quantity} | ${item.price}</p>
                          <p className="text-xs text-gray-500">Color: {item.color}, Size: {item.size}</p>
                        </div>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xl">Loading...</div>}>
      <AdminPanelContent />
    </Suspense>
  );
};

export default AdminPanel;
