// todo: refactor these into the appropriate /app/**/components/ folder

import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Sidebar({ children }: Readonly<{ children: ReactNode; }>) {
	return (
		<div className="hidden border-r bg-muted-40 md:block h-screen fixed top-0 left-0 w-[280px]">
			<div className="flex h-screen max-h-screen flex-col gap-2">
				{ children }
			</div>
		</div>
	);
}

const SidebarTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
	className,
	...props
}, ref) => (
	<div
		className={cn("flex h-14 min-h-14 lg:min-h-[60px] items-center border-b px-4 lg:h-[60px] lg:px-6", className)}
		ref={ref}
		{...props}
	/>
));

SidebarTitle.displayName = "SidebarTitle";

const SidebarContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
	className,
	...props
}, ref) => (
	<div className={cn("flex-1", className)} ref={ref} {...props} />
));

SidebarContent.displayName = "SidebarContent";

const SidebarFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
	className,
	...props
}, ref) => (
	<div className={cn("mt-auto p-4", className)} ref={ref} {...props} />
));

SidebarFooter.displayName = "SidebarFooter";

const SidebarList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
	className,
	...props
}, ref) => (
	<nav className={cn("grid items-start gap-2 px-2 text-sm font-medium lg:px-4", className)} ref={ref} {...props} />
));

SidebarList.displayName = "SidebarList";

export function SidebarSpacer() {
	return (
		<div className="border-b" />
	);
}

export { SidebarTitle, SidebarContent, SidebarFooter, SidebarList };
