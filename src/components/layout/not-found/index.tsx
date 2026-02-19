import Link from "next/link";
import { Grid, GridItem } from "../grid";

export function NotFoundPage() {
	return (
		<Grid className="h-screen">
			<GridItem
				start={2}
				end={11}
				className="py-10 h-screen flex flex-col gap-10 items-center justify-center"
			>
				<h1 className="opacity-60 text-white text-5xl md:text-6xl lg:text-8xl font-bold text-center">
					Woops, i think you are lost !
				</h1>
				<Link
					href={"/"}
					className="text-white px-16 py-4 text-[14px] border border-white hover:bg-white hover:text-black hover:border-white duration-300 font-semibold"
				>
					GO HOME
				</Link>
			</GridItem>
		</Grid>
	);
}
