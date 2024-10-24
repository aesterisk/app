import type { Metadata, Viewport } from "next";
import { Inter as createInter } from "next/font/google";
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils";
import { resetDatabaseMetrics } from "@/lib/db";
import { Toaster } from "@/components/ui/sonner";

const inter = createInter({ subsets: ["latin"] });

export const metadata: Metadata = {
	// todo: add more metadata
	// todo: finalize branding
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
			color: "hsl(210, 25%, 98.4%)",
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: "#000000",
		},
	],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	resetDatabaseMetrics(); // todo: redo for better analytics

	return (
		<html lang="en">
			<body className={cn("w-screen h-screen overflow-hidden", inter.className)}>
				{ children }
				<Toaster />
			</body>
		</html>
	);
}
