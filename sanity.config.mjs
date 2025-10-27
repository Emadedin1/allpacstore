import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { sanityConfig } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Allpac Studio',
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [
    deskTool({ structure }),
    visionTool({ defaultApiVersion: sanityConfig.apiVersion })
  ],
  schema,
})
