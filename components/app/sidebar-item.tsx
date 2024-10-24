// todo: refactor these into the appropriate /app/**/components/ folder

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import Link from "next/link";

type SidebarItemProps = {
	href: string;
	upgrade?: boolean;
	icon: ReactElement;
	label: string;
};

export function SidebarItem({ href, upgrade, icon, label }: SidebarItemProps) {
	const Icon = icon.type;
	const pathname = usePathname();
	const path = pathname.split("/").slice(0, 3).join("/") + href;
	const active = pathname.split("/").slice(0, 4).join("/") === path;

	return (
		<Link href={path} passHref legacyBehavior>
			<Button variant={active ? "default" : "ghost"} className="flex justify-start items-center gap-3 w-full">
				<Icon {...icon.props} />
				<span>{ label }</span>
				{ upgrade && <Badge variant={active ? "secondary" : "default"} className="ml-auto flex h-5 text-xs shrink-0 items-center justify-center rounded-full">{ "Pro" }</Badge> }
			</Button>
		</Link>
	);
}
