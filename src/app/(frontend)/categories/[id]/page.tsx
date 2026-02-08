import { ProjectListPage } from "@/features/project-list";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <ProjectListPage id={parseInt(id)}/>
  )
}
