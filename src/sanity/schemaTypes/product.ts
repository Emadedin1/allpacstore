import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // -------------------------------
    // BASIC INFO
    // -------------------------------
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Select Single Wall, Double Wall, or Lids category',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'highResImage',
      title: 'High Resolution Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // -------------------------------
    // VARIANTS / SIZES / OPTIONS
    // -------------------------------
    defineField({
      name: 'variants',
      title: 'Variants / Sizes / Options',
      type: 'array',
      description:
        'Use this for products with multiple sizes or options (e.g., 10oz, 12oz, 16oz cups). Leave empty for single items like lids.',
      of: [
        {
          name: 'variant',
          type: 'object',
          fields: [
            defineField({
              name: 'size',
              type: 'string',
              title: 'Size (oz or dimension)',
            }),
            defineField({
              name: 'topDia',
              type: 'string',
              title: 'Top Diameter (mm)',
            }),
            defineField({
              name: 'packing',
              type: 'string',
              title: 'Packing (pcs/ctn)',
            }),
            defineField({
              name: 'gsm',
              type: 'string',
              title: 'Paper GSM (if applicable)',
            }),
            defineField({
              name: 'notes',
              type: 'string',
              title: 'Notes / Comments',
            }),
          ],
        },
      ],
    }),

    // -------------------------------
    // UNIVERSAL SPECIFICATIONS
    // -------------------------------
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      description:
        'Common specifications for any product (cup or lid). Leave fields blank if not relevant.',
      fields: [
        defineField({ name: 'material', type: 'string', title: 'Material' }),
        defineField({ name: 'wallType', type: 'string', title: 'Wall Type' }),
        defineField({ name: 'use', type: 'string', title: 'Use (Hot / Cold)' }),
        defineField({
          name: 'compatibleLid',
          type: 'string',
          title: 'Compatible Lid',
          description:
            'Specify compatible lid size or type (e.g., 90mm Dome Lid)',
        }),
        defineField({
          name: 'topDiameterRange',
          type: 'string',
          title: 'Top Diameter Range (mm)',
          description:
            'For lids that fit multiple cup sizes (e.g., 80 / 90 / 105 mm)',
        }),
      ],
    }),

    // -------------------------------
    // TECHNICAL NOTES
    // -------------------------------
    defineField({
      name: 'notes',
      title: 'Technical Notes / Details',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Extra product details, compatibility, or usage info',
    }),
  ],
})
