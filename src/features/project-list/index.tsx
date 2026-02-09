import { Grid, GridItem } from '@/components/layout/grid';
import { Play } from 'lucide-react';
import config from '@/payload.config'
import Image from 'next/image';
import { getPayload } from "payload";
import Link from 'next/link';

export async function ProjectListPage({ id }: { id: number }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const categorie = await payload.findByID({
    collection: "categories",
    id,
    populate: {
      projects: {
        image: true,
        name: true,
        releaseDate: true
      }
    },
  })

  const projects = categorie?.relatedProjects?.map((project) =>
    typeof project !== "number" && {
      ...project,
      imageUrl: project.image && typeof project.image !== "number" && project.image.url,
    }
  ) || [];

  return <Grid className='my-10'>
    <GridItem span={"full"}>
      <h1 className='text-white text-8xl'>{categorie?.categoryName}</h1>
    </GridItem>
    {projects.map((project, idx) => (
      project && project.imageUrl && <ProjectPreview categoryId={id} imageUrl={project.imageUrl} projectId={idx+1} key={idx} />
    ))}
  </Grid>
}


function ProjectPreview({ categoryId, imageUrl, projectId }: { categoryId: number, imageUrl: string, projectId: number }) {
  return (
    <GridItem span={2} className='flex items-end'>
      <Link href={`/categories/${categoryId}/${projectId}`} className='relative group'>
        <Play className='group-hover:opacity-100 stroke-white w-8 opacity-0 duration-300 absolute top-1/2 left-1/2 -translate-1/2 z-10'/>
        <Image src={imageUrl} alt={"Category Image (not an alt)"} width={1940} height={1080} className="w-full h-auto group-hover:opacity-50 transition-opacity duration-300" />
      </Link>
    </GridItem>
  )
}
