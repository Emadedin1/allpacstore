'use client'

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { sanityConfig } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',

  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,

  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: sanityConfig.apiVersion }),
  ],
})
