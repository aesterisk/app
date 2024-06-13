import type { Metadata, Viewport } from "next";
import { Inter as createInter } from "next/font/google";
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils";

const inter = createInter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Aesterisk",
	description: "Gain control over your servers",
	applicationName: "Aesterisk",
	openGraph: {
		title: "Aesterisk",
		description: "Gain control over your servers",
		type: "website",
		siteName: "Aesterisk",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export const viewport: Viewport = {
	themeColor: [
		{
			media: "(prefers-color-scheme: light)",
			color: "#ffffff",
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: "#000000",
		},
	],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={cn("w-screen h-screen overflow-hidden", inter.className)}>
				{ children }
			</body>
		</html>
	);
}
