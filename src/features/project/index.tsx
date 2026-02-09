import { Grid, GridItem } from '@/components/layout/grid'
import config from '@/payload.config'
import { Play, SkipBack, SkipForward } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export async function ProjectPage({
  categoryId,
  projectId,
}: {
  categoryId: number
  projectId: number
}) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const projects = await payload.find({
    collection: 'projects',
    where: {
      relatedCategories: {
        contains: categoryId,
      },
    },
    sort: 'releaseDate',
    limit: 1,
    page: projectId,
  })

  if (!projects.docs || projects.docs.length === 0) {
    return null
  }
  console.log(projects)
  const project = projects.docs[0]

  return (
    <Grid>
      <GridItem start={4} className="flex h-screen items-center"></GridItem>
      <GridItem
        start={5}
        end={9}
        className="flex flex-col justify-center items-center h-screen py-(--grid-margin) gap-7"
      >
        <span className="relative h-1/2 max-h-1/2 flex items-center justify-center">
          <Link
            href={`/categories/${categoryId}/${projects.hasPrevPage ? projects.prevPage : projects.totalPages}`}
          >
            <SkipBack className="absolute top-1/2 -left-(--grid-gap) -translate-y-1/2 -translate-x-full fill-white stroke-white size-12 cursor-pointer" />
          </Link>
          {project.image && typeof project.image === 'object' && project.image.url ? (
            <Image
              src={project.image.url}
              alt={project.image.alt || 'Project image'}
              width={1920}
              height={1080}
              className="h-full object-contain"
            />
          ) : (
            <span className="w-full h-auto aspect-square bg-slate-500" />
          )}
          <Link href={`/categories/${categoryId}/${projects.hasNextPage ? projects.nextPage : 1}`}>
            <SkipForward className="absolute top-1/2 -right-(--grid-gap) -translate-y-1/2 translate-x-full fill-white stroke-white size-12 cursor-pointer" />
          </Link>
        </span>
        <div className="w-full px-9 py-2.5 rounded-full flex flex-row items-center gap-6 bg-[#070092] min-h-28">
          <Play className="fill-white stroke-white size-12" />
          <div className="flex flex-col w-full text-white">
            <h1 className="text-2xl font-semibold">{project.name}</h1>
            <p className="opacity-60 font-medium text-[16px]">{project.description}</p>
            {project.releaseDate && (
              <p className="opacity-60 text-[14px]">
                {months[new Date(project.releaseDate).getMonth()]}{' '}
                {new Date(project.releaseDate).getFullYear()}
              </p>
            )}
          </div>
        </div>
      </GridItem>
      <GridItem start={10} className="flex h-screen items-center"></GridItem>
    </Grid>
  )
}
