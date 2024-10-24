import { Sidebar } from "@/components/app/sidebar";
import React from "react";
import AesteriskSidebar from "@/app/panel/components/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AesteriskHeader from "@/app/panel/components/header";
import NoMFAWarning from "@/app/panel/components/no-mfa-warning";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
	const session = await auth();

	if(!session || !session.user) {
		redirect("/auth/login");
	}

	return (
		<>
			<div className="h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-auto">
				<Sidebar>
					<AesteriskSidebar />
				</Sidebar>
				<div className="flex flex-col ml-[280px] mt-14">
					<div className="h-14 lg:h-[60px] w-[calc(100vw-280px)] bg-background fixed top-0 z-10" />
					<AesteriskHeader />
					{ children }
				</div>
			</div>
			<NoMFAWarning mfaEnabled={session.user.twoFactor} />
		</>
	);
}
