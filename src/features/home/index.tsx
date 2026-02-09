import { getPayload } from 'payload'
import config from '@/payload.config'
import { HomePage } from './index-page'

export async function HomePageWrapper() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const projects = await payload.find({
    collection: 'projects',
    limit: 24,
  })

  let projectsList = projects.docs || []

  return <HomePage projectsList={projectsList} />
}
