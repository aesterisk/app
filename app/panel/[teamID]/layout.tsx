"use client";

import React from "react";
import { TeamUpdater } from "@/app/panel/hooks/team";

export default function Layout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: { teamID: string; };
}>) {
	return (
		<TeamUpdater teamPath={params.teamID}>
			{ children }
		</TeamUpdater>
	);
}
