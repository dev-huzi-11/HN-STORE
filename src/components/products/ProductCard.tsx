import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import renderStars from "../renderStar/RenderStar";
import { Product } from "../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";

interface ProductProps {
  product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
  const price = product.price ?? 0;

  const discountedPrice = product.discountPercent
    ? (price * (100 - product.discountPercent)) / 100
    : price;

  const imageUrl = product.image ? urlFor(product.image).url() : null;

  return (
    <Card className="hover:scale-105 transition duration-300 h-[23rem]">
      <CardHeader className="relative bg-[#f1f1f1] flex justify-center items-center w-full mb-2 h-[13rem] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            fill
            quality={100}
            alt={product.name || "Product Image"}
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            No Image Available
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardTitle className="text-base font-light uppercase text-gray-700">
          {product.name || "Unnamed Product"}
        </CardTitle>
        <CardDescription className="text-sm mt-1">
          <div className="flex gap-2 my-2">
            {renderStars(product.ratings || 0)}
            <p>{product.ratings || 0}/5</p>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex gap-3 mt-2 items-center text-black">
              {product.discountPercent ? (
                <>
                  <span className="text-lg">${discountedPrice.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-base">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-red-500 bg-red-100 px-3 py-1 rounded-xl text-base">
                    -{product.discountPercent}%
                  </span>
                </>
              ) : (
                <span className="text-lg">${discountedPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
