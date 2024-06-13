import { Sidebar } from "@/components/app/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Menu, Search } from "lucide-react";
import React from "react";
import AesteriskSidebar from "@/app/panel/components/sidebar";
import { user } from "@/app/example-data";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem,
	DropdownMenuLabel, DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getPrimaryChars } from "@/lib/utils";
import Link from "next/link";
import { TeamProvider } from "@/app/panel/hooks/team";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import AesteriskBreadcrumb from "@/app/panel/components/breadcrumb";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<TeamProvider>
			<div className="h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-auto">
				<Sidebar>
					<AesteriskSidebar />
				</Sidebar>
				<div className="flex flex-col ml-[280px] mt-14">
					<div className="h-14 lg:h-[60px] w-[calc(100vw-280px)] bg-background fixed top-0 z-10" />
					<header className="flex h-14 w-[calc(100vw-280px)] items-center gap-4 border-b bg-muted/40 px-2 lg:h-[60px] min-w-max lg:px-4 fixed top-0 z-20">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" size="icon" className="shrink-0 md:hidden">
									<Menu className="h-5 w-5" />
									<span className="sr-only">{ "Toggle navigation menu" }</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="flex flex-col gap-2">
								<AesteriskSidebar />
							</SheetContent>
						</Sheet>
						<div className="w-full flex-1 grid items-center gap-4 place-items-stretch grid-cols-2 lg:grid-cols-3 grid-rows-1">
							<Breadcrumb className="hidden lg:block">
								<BreadcrumbList>
									<AesteriskBreadcrumb />
								</BreadcrumbList>
							</Breadcrumb>
							<div className="">
								<form>
									<div className="relative flex">
										<Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
										<Input type="search" placeholder="Search" className="w-full flex-1 appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" />
									</div>
								</form>
							</div>
							<div className="flex items-center gap-4 g:w-[536px] justify-end">
								<Link href="/docs">
									<Button variant="link" className="p-0">
										<span>{ "Docs" }</span>
										<ArrowUpRight className="h-4 w-4 mb-2 ml-1" />
									</Button>
								</Link>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="secondary" size="icon" className="rounded-full">
											<Avatar>
												<AvatarFallback>{ getPrimaryChars(user.name) }</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>{ user.name }</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>{ "Manage Account" }</DropdownMenuItem>
										<DropdownMenuItem>{ "Support" }</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="!text-destructive">{ "Logout" }</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</header>
					{ children }
				</div>
			</div>
		</TeamProvider>
	);
}
