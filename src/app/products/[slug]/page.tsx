"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/lib/client";
import { Product } from "../../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "@/components/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductReviews from "@/components/reviews/GetAllReviews";

interface Review {
  _id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

interface ProductProps {
  product: Product;
  reviews: Review[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

const ProductPage = ({ params }: Props) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [slug, setSlug] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!slug || !isClient) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "product" && slug.current == $slug] {
          _id,
          name,
          slug,
          description,
          price,
          "image": image.asset->url,
          category,
          discountPercent,
          "isNew": new,
          colors,
          sizes
        }`;
        const result = await client.fetch(query, { slug });

        if (result && result.length > 0) {
          const productId = result[0]._id;

          const reviewsQuery = `*[_type == "reviews" && product._ref == $productId]{
            _id,
            user,
            comment,
            rating,
            date
          }`;
          const reviews = await client.fetch(reviewsQuery, { productId });

          setProduct({ product: result[0], reviews });
          setError(null);
        } else {
          setError("Product not found.");
          setProduct(null);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Failed to load product: ${err.message}`);
        } else {
          setError("Failed to load product due to an unknown error.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, isClient]);

  const handleAddToCart = useCallback(() => {
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size");
      return;
    }
    if (product) {
      addToCart({
        id: product.product._id,
        name: product.product.name || "",
        image: product.product.image ? urlFor(product.product.image).url() : "",
        color: selectedColor,
        size: selectedSize,
        price: product.product.price || 0,
        quantity,
      });
      toast({
        title: "Product added to cart",
        description: `${product.product.name} has been added to your cart.`,
      });
    }
  }, [product, selectedColor, selectedSize, quantity, addToCart, toast]);

  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Skeleton className="w-[35rem] h-[40rem]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  const price = product?.product.price || 0;
  const discountPercent = product?.product.discountPercent || 0;
  const discountedPrice = discountPercent
    ? (price * (100 - discountPercent)) / 100
    : price;

  const imageUrl = product?.product.image
    ? urlFor(product.product.image).url()
    : null;

  return (
    <div className="container w-full px-4 py-8 min-h-screen mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {product?.product.name ?? "Product"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Product Details */}
        <div className="flex flex-col items-center lg:flex-row gap-8">
          {/* Images Section */}
          <div className="flex gap-x-6 gap-y-4 flex-col sm:flex-row mt-4">
            {/* Thumbnail Images */}
            {imageUrl && (
              <div className="flex flex-row sm:flex-col gap-4 mt-10 w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] sm:mt-16 md:mt-10">
                {[...Array(3)].map((_, index) => (
                  <Image
                    key={index}
                    width={100}
                    height={100}
                    src={imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="max-w-[30rem]">
              {imageUrl ? (
                <Image
                  width={800}
                  height={800}
                  src={imageUrl}
                  alt={product?.product.name || "Product Image"}
                  className="w-full h-[30rem] object-contain rounded-md"
                />
              ) : (
                <div className="w-full h-[30rem] bg-gray-200 flex items-center justify-center rounded-md">
                  No Image Available
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:w-[50%]">
            <h1 className="text-3xl md:text-5xl font-bold">
              {product?.product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold">
                ${price.toFixed(2)}
              </span>
              {discountPercent > 0 && (
                <>
                  <span className="text-2xl font-semibold text-gray-500 line-through">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-gray-500">
              {product?.product.description ?? "No description available."}
            </p>

            {/* Product Colors */}
            {product?.product.colors && product.product.colors.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {product.product.colors.map((color, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                    style={{
                      backgroundColor: color,
                    }}
                    className={`w-10 h-10 rounded-full cursor-pointer border ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-black"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Product Sizes */}
            {product?.product.sizes && product.product.sizes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.product.sizes.map((size, i) => (
                  <Button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-12 lg:px-8 py-6 lg:py-6 text-sm rounded-full ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100 text-black border border-gray-300 hover:text-white"
                    }`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-6 py-5 text-lg rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  -
                </Button>
                <span className="font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-6 py-5 text-lg rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  +
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="w-full py-6 rounded-full"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="w-full">
          <ProductReviews
            reviews={product?.reviews || []}
            productId={product?.product._id || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
