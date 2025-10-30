import HomeClient from "./HomeClient"

export const metadata = {
  title: "Allpac Store | Canadian Paper Cup Manufacturer & B2B Supplier",
  description:
    "Allpac manufactures single wall and double wall paper cups in Windsor, Ontario. Trusted by distributors, importers, and coffee chains across North America for high-quality, eco-friendly paper packaging.",
  alternates: { canonical: "https://allpacstore.com/" },
}

export default function Home() {
  return <HomeClient />
}
