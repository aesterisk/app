import { Button } from "@/components/ui/button";
import { Asterisk, Bolt, Boxes, FolderInput, Globe, Home, Server, Users, Waypoints, Workflow } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";
import {
	SidebarContent,
	SidebarFooter,
	SidebarList,
	SidebarSpacer,
	SidebarTitle,
} from "@/components/app/sidebar";
import { SidebarItem } from "@/components/app/sidebar-item";
import Link from "next/link";
import TeamSwitcherLoading from "@/components/app/team-switcher-loading";
import TeamSwitcherLoader from "@/components/app/team-switcher-loader";

export default function AesteriskSidebar() {
	return (
		<>
			<SidebarTitle>
				<Link href="/">
					<Button variant="link" className="flex items-center gap-2 font-semibold text-lg p-1">
						<Asterisk className="h-6 w-6" />
						<span>{ "Aesterisk" }</span>
					</Button>
				</Link>
			</SidebarTitle>
			<SidebarContent>
				<div className="flex items-center justify-center h-14 px-2 lg:px-4 py-8 mb-2">
					<Suspense fallback={<TeamSwitcherLoading />}>
						<TeamSwitcherLoader />
					</Suspense>
				</div>
				<SidebarList>
					<SidebarItem icon={<Home size={16} />} label="Dashboard" href="" />
					<SidebarItem icon={<Boxes size={16} />} label="Servers" href="/servers" />
					<SidebarItem icon={<Workflow size={16} />} label="Workflows" href="/workflows" upgrade />
					<SidebarSpacer />
					<SidebarItem icon={<Waypoints size={16} />} label="Networks" href="/networks" />
					<SidebarItem icon={<FolderInput size={16} />} label="Shares" href="/shares" />
					<SidebarItem icon={<Server size={16} />} label="Nodes" href="/nodes" />
					<SidebarSpacer />
					<SidebarItem icon={<Globe size={16} />} label="Domains" href="/domains" />
					<SidebarItem icon={<Users size={16} />} label="Users" href="/users" />
					<SidebarItem icon={<Bolt size={16} />} label="Settings" href="/settings" />
				</SidebarList>
			</SidebarContent>
			<SidebarFooter>
				<Card>
					<CardHeader className="p-4">
						<CardTitle className="cursor-default">{ "Upgrade to Pro" }</CardTitle>
						<CardDescription className="cursor-default">
							{ "Manage unlimited nodes and get access to the powerful " }
							<Button variant="link" className="p-0 h-min">{ "Aesterisk Workflows" }</Button>
							{ "." }
						</CardDescription>
					</CardHeader>
					<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
						<Button size="sm" className="w-full">
							{ "Upgrade" }
						</Button>
					</CardContent>
				</Card>
			</SidebarFooter>
		</>
	);
}
