import dotenv from 'dotenv'

// Load .env.local manually when outside Next.js runtime (e.g., scripts)
if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  dotenv.config({ path: '.env.local' })
}

function assertValue(v: string | undefined, errorMessage: string): string {
  if (!v) throw new Error(errorMessage)
  return v
}

export const sanityConfig = {
  projectId: assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
  ),
  dataset: assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
  ),
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
}
