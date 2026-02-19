import type React from "react";
import "./styles.css";
import ReactLenis from "lenis/react";
import { MainLayout } from "@/components/layout/main";
import { allFonts } from "@/lib/fonts";

export const metadata = {
	title: "Clara Baptista portfolio",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props;

	const fontVariables = allFonts.map((font) => font.variable).join(" ");

	return (
		<html lang="en" className={fontVariables}>
			<body>
				<ReactLenis root />
				<MainLayout>{children}</MainLayout>
			</body>
		</html>
	);
}
