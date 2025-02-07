import { defineType } from "sanity";

export const dressStyle = defineType({
  name: "dressStyle",
  title: "Dress Style",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
            source: "name",
            maxLength: 200,
          },
    },
    {
        name: "image",
        title: "Image",
        type: "image",
    }
  ],
});
