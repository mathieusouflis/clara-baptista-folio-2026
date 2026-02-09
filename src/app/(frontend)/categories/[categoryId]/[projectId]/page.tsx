import { ProjectPage } from "@/features/project";

export default async function Page({ params }: { params: Promise<{ categoryId: string, projectId: string }> }) {
  const { categoryId, projectId } = await params;
  return (
    <ProjectPage categoryId={parseInt(categoryId)} projectId={parseInt(projectId)}/>
  )
}
