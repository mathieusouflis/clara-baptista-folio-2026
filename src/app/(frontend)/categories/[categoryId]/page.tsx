import { ProjectListPage } from "@/features/project-list";

export default async function Page({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  return (
    <ProjectListPage id={parseInt(categoryId)}/>
  )
}
