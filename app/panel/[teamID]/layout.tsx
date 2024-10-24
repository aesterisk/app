import React from "react";
import { setPath } from "@/app/panel/caches/team";
import { SocketProvider } from "@/app/panel/[teamID]/hooks/socket";

export default function Layout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { teamID: string; };
}>) {
	setPath(params.teamID);

	return (
		<SocketProvider>
			{ children }
		</SocketProvider>
	);
}
