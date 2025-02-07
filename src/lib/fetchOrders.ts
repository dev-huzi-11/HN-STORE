import { client } from "@/sanity/lib/client";

export async function fetchOrderDetails() {
  try {
    const query = await client.fetch(`
      *[_type == "orderDetail"] | order(_createdAt desc) {
        _id,
        firstName,
        lastName,
        email,
        address,
        city,
        province,
        zipCode,
        "items": items[]{
          id,
          name,
          quantity,
          price,
          color,
          size,
          "image": image
        }
      }
    `);
    return query;
  } catch (error) {
    console.error("Error fetching order details:", error);
    return [];
  }
}
