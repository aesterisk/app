import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Asterisk } from "lucide-react";
import { Card } from "@/components/ui/card";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode; }) {
	return (
		<main className="w-full h-full bg-black flex">
			<div className="w-[32rem] h-full flex flex-col justify-center items-center bg-background">
				<div className="flex-[0.125]" />
				<Link href="/">
					<Button variant="link" className="flex items-center gap-2 font-semibold text-3xl p-1">
						<Asterisk className="h-9 w-9" />
						<span>{ "Aesterisk" }</span>
					</Button>
				</Link>
				<div className="flex-[0.375]" />
				<Card className="mx-auto max-w-md">
					{ children }
				</Card>
				<div className="flex-[0.5]" />
			</div>
			<div className="flex justify-center items-center flex-1">
				<p className="text-white p-8 text-6xl text-center">
					<span className="">{ "Revolutionizing " }</span>
					<span className="font-bold">{ "server" }</span>
					<br />
					<span className="font-bold">{ "management " }</span>
					<span className="font-normal">{ "with" }</span>
					<br />
					<span className="font-normal italic">{ "elegance " }</span>
					<span className="font-normal">{ "and" }</span>
					<br />
					<span className="font-light">{ "simplicity" }</span>
					<span className="font-normal">{ "." }</span>
				</p>
			</div>
		</main>
	);
}
