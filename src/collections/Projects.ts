import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    group: "Projects",
    groupBy: true,
  },
  access: {
    read: () => true,
  },

  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        try {
          const project = await req.payload.findByID({
            collection: 'projects',
            id,
            req,
          })

          if (project && project.relatedCategories) {
            const categoryIds = (project.relatedCategories || []).map((c: any) =>
              typeof c === 'object' ? c.id : c
            )

            for (const categoryId of categoryIds) {
              try {
                const category = await req.payload.findByID({
                  collection: 'categories',
                  id: categoryId,
                  req,
                })

                if (category) {
                  const currentCount = category.projectCount || 0
                  const newCount = Math.max(0, currentCount - 1)

                  const updatedProjects = (category.relatedProjects || [])
                    .map((p: any) => typeof p === 'object' ? p.id : p)
                    .filter((projectId: string) => projectId !== id)

                  await req.payload.update({
                    collection: 'categories',
                    id: categoryId,
                    data: {
                      projectCount: newCount,
                      relatedProjects: updatedProjects,
                    },
                    req,
                  })
                }
              } catch (error) {
                console.error(`Error updating category ${categoryId} when deleting project:`, error)
              }
            }
          }
        } catch (error) {
          console.error(`Error in beforeDelete hook for project ${id}:`, error)
        }
      },
    ],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: "releaseDate",
      type: 'date',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'relatedCategories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        readOnly: true
      }
    },
  ],
}
