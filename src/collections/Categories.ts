import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'categoryName',
    group: "Projects"
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'categoryName',
      type: 'text',
      required: true,
    },
    {
      name: "relatedProjects",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
    }
  ],
}
