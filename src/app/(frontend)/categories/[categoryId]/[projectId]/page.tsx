import { ProjectPage } from '@/features/project'
import { getPayload } from 'payload';
import config from '@/payload.config'

export const metadata = {
  title: "Clara Baptista Portfolio - Project"
}

export default async function Page({
  params,
}: {
  params: Promise<{ categoryId: string; projectId: string }>
}) {
  const { categoryId, projectId } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const projects = await payload.find({
    collection: 'projects',
    where: {
      relatedCategories: {
        contains: parseInt(categoryId),
      },
    },
    sort: 'releaseDate',
    limit: 1,
    page: parseInt(projectId),
  })

  const project = projects.docs[0]

  metadata.title = `Clara Baptista Portfolio - ${project.name}`

  return <ProjectPage projects={projects} categoryId={parseInt(categoryId)}/>
}
