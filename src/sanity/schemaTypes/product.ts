import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageHiRes",
      title: "High Resolution Image",
      type: "image",
      options: { hotspot: true },
    }),

    // 🆕 Universal “Variants / Sizes” field
    defineField({
      name: "variants",
      title: "Variants / Sizes / Options",
      type: "array",
      description:
        "Flexible list for all product types. Can include sizes, pack types, colors, etc.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label / Option Name",
              type: "string",
              description: "Example: 10 oz, Large, 500ml, 12x12 box, etc.",
            },
            {
              name: "attributes",
              title: "Attributes",
              type: "array",
              of: [{ type: "string" }],
              description:
                "Add details like GSM: 300, Material: PET, or Case Qty: 1000",
            },
            {
              name: "priceCase",
              title: "Price per Case ($)",
              type: "number",
            },
            {
              name: "qtyCase",
              title: "Quantity per Case",
              type: "number",
            },
            {
              name: "sku",
              title: "SKU / Code (optional)",
              type: "string",
            },
            {
              name: "image",
              title: "Variant Image (optional)",
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),

    defineField({
      name: "specs",
      title: "Specifications",
      type: "object",
      fields: [
        {
          name: "Description",
          title: "Description",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "Material",
          title: "Material",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "Dimensions",
          title: "Dimensions",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
  ],
});
