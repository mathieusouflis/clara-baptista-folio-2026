import { getPayload } from "payload"
import config from '@/payload.config'

export async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const projects = await payload.find({
    collection: "projects",
    limit: 0,
  })

  return <>{ JSON.stringify(projects, null, 2)}</>
}
