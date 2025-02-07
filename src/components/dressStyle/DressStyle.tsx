"use client";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type DressStyle = {
  _id: string;
  name: string;
  slug: string;
  image: { asset: string };
};

async function fetchNewProducts() {
  try {
    const query = await client.fetch(`
      *[_type == "dressStyle" ] {
        _id,
        name,
        slug,
        "image": image.asset->url,
      }
    `);

    return query.map((dressStyle: DressStyle) => ({
      ...dressStyle,
    }));
  } catch (error) {
    console.error("Error fetching new products:", error);
    throw error;
  }
}

const DressStyle = () => {
  const [dress, setDress] = useState<DressStyle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNewProducts();
        setDress(data);
      } catch (error) {
        setError(`Something went wrong ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen px-4 py-10 ">
      <div className="max-w-6xl mx-auto bg-[#f1f1f1] px-4 py-10">
        <h1 className="uppercase text-2xl md:text-4xl font-semibold text-center">
          Browse by dress style
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-full h-72" />
                </div>
              ))}
          </div>
        ) : error ? (
          <div className="text-center mt-10 text-red-500">
            {error}
            <Button onClick={() => window.location.reload()} className="ml-4">
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {dress.map((dressItem) => (
              <div key={dressItem._id} className="relative">
                <h3 className="text-lg font-medium absolute top-1 left-2 z-50">{dressItem.name}</h3>
                <div 
               
                className="w-full h-[14rem] cursor-pointer hover:scale-105 transition duration-300">

                <Image
                  src={urlFor(dressItem.image).url()}
                  width={200}
                  height={200}
                  alt={dressItem.name}
                  className="rounded-lg w-full h-full object-cover"
                  />
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DressStyle;
