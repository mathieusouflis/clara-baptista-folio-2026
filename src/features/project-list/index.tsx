import config from '@/payload.config'
import { getPayload } from "payload";

export async function ProjectListPage({ id }: { id: number }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const categories = await payload.findByID({
    collection: "categories",
    id,
    populate: {
      projects: {
        image: true,
        name: true,
        releaseDate: true
      }
    }
  })

  const projects = categories?.relatedProjects?.map((project) =>
    typeof project !== "number" && {
      ...project,
      imageUrl: project.image && typeof project.image !== "number" && project.image.url,
    }
  ) || [];

  return null
}
