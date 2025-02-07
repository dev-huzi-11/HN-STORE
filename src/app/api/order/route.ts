import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    console.log("Incoming POST request...");

    const body = await req.json();
    console.log("Parsed Request Body:", body);

    if (!body.firstName || !body.lastName || !body.email || !body.address) {
      console.error("Validation Failed - Missing Fields:", body);
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      console.error("Validation Failed - No items in order:", body.items);
      return NextResponse.json({ error: "Order must contain at least one item" }, { status: 400 });
    }

    console.log("Creating Order in Sanity...");
    const newOrder = await client.create({
      _type: "orderDetail",
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      address: body.address,
      city: body.city,
      province: body.province,
      zipCode: body.zipCode,
      items: body.items,
    });

    console.log("Order Created Successfully:", newOrder);
    return NextResponse.json({ success: true, order: newOrder });

  } catch (error: unknown) {
    console.error("Sanity Order Error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Failed to place order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
