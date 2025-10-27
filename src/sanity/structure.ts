import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // 🏷️ Categories
      S.documentTypeListItem('category')
        .title('Categories')
        .child(
          S.documentList()
            .title('All Categories')
            .filter('_type == "category"')
        ),

      // 🧃 Products
      S.documentTypeListItem('product')
        .title('Products')
        .child(
          S.documentList()
            .title('All Products')
            .filter('_type == "product"')
        ),

      S.divider(),

      // 🛠 Future sections (like Orders, Pages, Settings)
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ])
