import { getPayload } from "payload"
import config from '@/payload.config'
import { Grid, GridItem } from "@/components/layout/grid"
import { Project } from "@/payload-types"
import InfiniteScrollColumn from "./components/infinite-scroll-column"
import Link from "next/link"



export async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const projects = await payload.find({
    collection: "projects",
    limit: 24,
  })

  let projectsList = projects.docs || [];
  const totalProjects = projectsList.length;

  // Ensure there are at least 24 projects to form 6 groups of 4
  while (projectsList.length < 24) {
    const randomIndex = Math.floor(Math.random() * totalProjects);
    projectsList.push({ ...projectsList[randomIndex] });
  }

  // Create 6 groups of 4 projects each
  const projectsGroups: Project[][] = [];
  for (let i = 0; i < 6; i++) {
    projectsGroups.push(projectsList.slice(i * 4, i * 4 + 4));
  }

  // Define speeds for each column (in seconds for one full loop)
  const speeds = [40, 60, 80, 90, 70, 50];

  return <div className="relative">
    <div className="absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
      <span className="relative">
        <h1 className="font-aston-script text-6xl md:text-8xl lg:text-9xl text-white whitespace-nowrap">
          Portfolio
        </h1>
        <p className="absolute -bottom-5 right-0 text-white text-xl uppercase ">Clara Baptista</p>
        <Link href={"/categories"} className="absolute -bottom-52 left-1/2 -translate-x-1/2 text-white px-16 py-4 text-[14px] border border-white hover:bg-white hover:text-black hover:border-white duration-300">
          ENTER
        </Link>
      </span>
    </div>
  <Grid className="h-screen pointer-events-none">
    <GridItem span={2}>
      <InfiniteScrollColumn projects={projectsGroups[0]} gap={600} direction="down" speed={speeds[0]} pauseOnHover={false}/>
    </GridItem>
    <GridItem span={2}>
      <InfiniteScrollColumn projects={projectsGroups[1]} gap={600} direction="down" speed={speeds[1]} pauseOnHover={false}/>
    </GridItem>
    <GridItem span={2}>
      <InfiniteScrollColumn projects={projectsGroups[2]} gap={600} direction="down" speed={speeds[2]} pauseOnHover={false}/>
    </GridItem>
    <GridItem span={2}>
      <InfiniteScrollColumn projects={projectsGroups[3]} gap={600} direction="down" speed={speeds[3]} pauseOnHover={false}/>
    </GridItem>
    <GridItem span={2}>
      <InfiniteScrollColumn projects={projectsGroups[4]} gap={600} direction="down" speed={speeds[4]} pauseOnHover={false}/>
    </GridItem>
    <GridItem span={2}>
      <InfiniteScrollColumn projects={projectsGroups[5]} gap={600} direction="down" speed={speeds[5]} pauseOnHover={false} />
    </GridItem>
  </Grid>
  </div>
}
