import { ProjectListPage } from '@/features/project-list'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Category } from '@/payload-types'
import { NotFoundPage } from '@/components/layout/not-found'

export const metadata = {
  title: 'Clara Baptista Portfolio - Category',
}

export default async function Page({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let category: Category

  try {
    category = await payload.findByID({
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
  } catch (error) {
    return <NotFoundPage />
  }

  metadata.title = `Clara Baptista Portfolio - ${category.categoryName}`

  return <ProjectListPage category={category} />
}
