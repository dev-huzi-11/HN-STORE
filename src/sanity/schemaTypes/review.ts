import { defineType } from "sanity";

export const reviews = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    {
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "user",
      title: "User",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "comment",
      title: "Comment",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).required(),
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
  ],
});
