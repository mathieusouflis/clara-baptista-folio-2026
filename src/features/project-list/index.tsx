import { Grid, GridItem } from '@/components/layout/grid'
import { Play } from 'lucide-react'
import config from '@/payload.config'
import Image from 'next/image'
import { getPayload } from 'payload'
import Link from 'next/link'
import { Category } from '@/payload-types'

export async function ProjectListPage({ category }: { category: Category }) {
  const projects =
    category?.relatedProjects?.map(
      (project) =>
        typeof project !== 'number' && {
          ...project,
          imageUrl: project.image && typeof project.image !== 'number' && project.image.url,
        },
    ) || []

  if (projects.length === 0)
    return (
      <Grid className='h-screen'>
        <GridItem start={2} end={11} className='py-10 h-screen flex flex-col gap-10 items-center justify-center'>
          <h1 className="opacity-60 text-white text-5xl md:text-6xl lg:text-8xl font-bold text-center">WIP, stay tuned !</h1>
          <Link
            href={'/categories'}
            className="text-white px-16 py-4 text-[14px] border border-white hover:bg-white hover:text-black hover:border-white duration-300 font-semibold"
          >
            GO BACK
          </Link>
        </GridItem>
      </Grid>
    )

  return (
    <Grid className="my-10">
      <GridItem span={'full'}>
        <h1 className="text-white text-8xl">{category?.categoryName}</h1>
      </GridItem>
      {projects.map(
        (project, idx) =>
          project &&
          project.imageUrl && (
            <ProjectPreview
              categoryId={category.id}
              imageUrl={project.imageUrl}
              projectId={idx + 1}
              key={idx}
            />
          ),
      )}
    </Grid>
  )
}

function ProjectPreview({
  categoryId,
  imageUrl,
  projectId,
}: {
  categoryId: number
  imageUrl: string
  projectId: number
}) {
  return (
    <GridItem span={2} className="flex items-end">
      <Link href={`/categories/${categoryId}/${projectId}`} className="relative group">
        <Play className="group-hover:opacity-100 stroke-white w-8 opacity-0 duration-300 absolute top-1/2 left-1/2 -translate-1/2 z-10" />
        <Image
          src={imageUrl}
          alt={'Category Image (not an alt)'}
          width={1940}
          height={1080}
          className="w-full h-auto group-hover:opacity-50 transition-opacity duration-300"
        />
      </Link>
    </GridItem>
  )
}
