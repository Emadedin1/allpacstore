import {StructureResolver} from 'sanity/structure'
// ... your desk builder code
export const structure: StructureResolver = (S) => {
  // build your desk here
  return S.list().title('Content').items([
    // ...
  ])
}
