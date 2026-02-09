import { ProjectListPage } from '@/features/project-list'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const metadata = {
  title: "Clara Baptista Portfolio - Category"
}

export default async function Page({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const category = await payload.findByID({
    collection: 'categories',
    id: parseInt(categoryId),
    populate: {
      projects: {
        image: true,
        name: true,
        releaseDate: true,
      },
    },
  })

  metadata.title = `Clara Baptista Portfolio - ${category.categoryName}`

  return <ProjectListPage category={category} />
}
