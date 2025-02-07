import { defineType } from "sanity";

export const orderDetail = defineType({
  name: "orderDetail",
  type: "document",
  title: "Order Detail",
  fields: [
    {
      name: "firstName",
      type: "string",
      title: "First Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lastName",
      type: "string",
      title: "Last Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "address",
      type: "string",
      title: "Address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "city",
      type: "string",
      title: "City",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "province",
      type: "string",
      title: "Province",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "zipCode",
      type: "string",
      title: "Zip Code",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      type: "array",
      title: "Items",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              type: "string",
              title: "Product ID",
            },
            {
              name: "name",
              type: "string",
              title: "Product Name",
            },
            {
              name: "quantity",
              type: "number",
              title: "Quantity",
            },
            {
              name: "price",
              type: "number",
              title: "Price",
            },
            {
              name: "color",
              type: "string",
              title: "Color",
            },
            {
              name: "size",
              type: "string",
              title: "Size",
            },
            { name: "image", type: "url", title: "Product Image" },
          ],
        },
      ],
    },
  ],
});
