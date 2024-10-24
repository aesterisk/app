import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Command, LifeBuoy, LogOut, Menu, Search, User } from "lucide-react";
import AesteriskSidebar from "@/app/panel/components/sidebar";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import AesteriskBreadcrumb from "@/app/panel/components/breadcrumb";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import AesteriskAvatar from "@/app/panel/components/header/avatar";
import AesteriskDropdownLabel from "@/app/panel/components/header/dropdown-label";
import { Skeleton } from "@/components/ui/skeleton";

export default function AesteriskHeader() {
	return (
		<header className="flex h-14 w-[calc(100vw-280px)] items-center gap-4 border-b bg-muted-40 px-2 lg:h-[60px] min-w-max lg:px-4 fixed top-0 z-20">
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
					{ /* todo: create docs */ }
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
									<Suspense>
										<AesteriskAvatar />
									</Suspense>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<Suspense fallback={<DropdownMenuLabel className="py-2.5"><Skeleton className="h-3 w-24" /></DropdownMenuLabel>}>
								<AesteriskDropdownLabel />
							</Suspense>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User size={16} className="mr-1.5" />
								{ "Manage Account" }
							</DropdownMenuItem>
							<DropdownMenuItem>
								<LifeBuoy size={16} className="mr-1.5" />
								{ "Support" }
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<form
								action={
									async() => {
										"use server";
										try {
											await signOut({ redirectTo: "/" });
										} catch(error) {
											if(error instanceof AuthError) {
												redirect(`/auth/error?error=${error.type}`);
											}

											throw error;
										}
									}
								}
							>
								<button type="submit" className="w-full">
									<DropdownMenuItem className="text-destructive focus:text-destructive">
										<LogOut size={16} className="mr-1.5" />
										{ "Logout" }
									</DropdownMenuItem>
								</button>
							</form>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
