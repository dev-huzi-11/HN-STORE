import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received data:", body); 

    const { productId, user, comment, rating } = body;

    const newReview = await client.create({
      _type: "review",
      product: { _type: "reference", _ref: productId },
      user,
      comment,
      rating,
      date: new Date().toISOString(),
    });

    return NextResponse.json(newReview, { status: 201 });

  } catch (error: unknown) {
    console.error("Review Submission Error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Failed to submit review", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

