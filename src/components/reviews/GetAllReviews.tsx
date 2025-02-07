"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  _id: string;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

interface ProductReviewsProps {
  reviews: Review[];
  productId: string;
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={20}
      className={`${
        rating >= i + 1
          ? "text-yellow-500"
          : rating > i
            ? "text-yellow-500 opacity-50"
            : "text-gray-300"
      } fill-current`}
    />
  ));
};

const ProductReviews = ({ reviews, productId }: ProductReviewsProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allReviews, setAllReviews] = useState(reviews);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmitReview = async () => {
    if (!user || !comment || rating === 0) {
      alert("Please fill out all fields and select a rating.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      console.log("Sending data to API:", { productId, user, comment, rating });
  
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          user,
          comment,
          rating,
        }),
      });
  
      const responseData = await response.json();
      console.log("API Response:", responseData);
  
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit review");
      }
  
      setAllReviews([responseData, ...allReviews]);
      setIsDialogOpen(false);
      setUser("");
      setComment("");
      setRating(0);
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 my-8 lg:px-8">
      <Tabs defaultValue="Rating & Reviews" className="w-full">
        <TabsList className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-30 md:h-16">
          <TabsTrigger
            className="bg-transparent w-full h-full text-lg"
            value="Product Details"
          >
            Product Details
          </TabsTrigger>
          <TabsTrigger
            className="bg-transparent w-full h-full text-lg"
            value="Rating & Reviews"
          >
            Rating & Reviews
          </TabsTrigger>
          <TabsTrigger
            className="bg-transparent w-full h-full text-lg"
            value="FAQ'S"
          >
            FAQ&apos;S
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Rating & Reviews">
          <div className="flex flex-col items-center">
            <div className="w-full">
              <div className="flex justify-between items-center gap-4 my-8 px-4">
                <h2 className="text-lg font-medium">All Reviews</h2>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="px-10 py-6 bg-black text-white rounded-full hover:bg-gray-900 transition-colors"
                >
                  Write a Review
                </Button>
              </div>
            </div>

            {allReviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No reviews yet. Be the first to review!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allReviews.map((review) => (
                  <div key={review._id} className="p-6 border rounded-lg shadow-md w-[20rem]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1 my-2">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-gray-500 text-sm">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                      <span className="text-lg font-bold text-black mr-2">
                        {review.user}{" "}
                      </span>
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                    <p className="mt-4 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="Product Details">
          <p>Product detail is here.</p>
        </TabsContent>

        <TabsContent value="FAQ'S">
          <p>FAQs is here.</p>
        </TabsContent>
      </Tabs>

      {/* Review Submission Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Write a Review</AlertDialogTitle>
            <AlertDialogDescription>
              Share your experience with this product.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Your Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <Textarea
              placeholder="Your Review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className={`text-2xl bg-transparent outline-none border-none shadow-none hover:bg-transparent ${
                    rating >= i + 1 ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </Button>
              ))}
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleSubmitReview} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductReviews;
