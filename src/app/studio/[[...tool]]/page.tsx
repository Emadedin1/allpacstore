'use client'

import dynamic from 'next/dynamic'
const NextStudio = dynamic(
  () => import('next-sanity/studio').then(m => m.NextStudio),
  { ssr: false }
)
import config from '../../../../sanity.config.mjs' // adjust path if needed

export default function StudioPage() {
  return <NextStudio config={config} />
}
