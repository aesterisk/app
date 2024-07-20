import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";

export default function LoginButton({
	provider,
	children,
	outline,
}: {
	provider: string;
	children: React.ReactNode;
	outline?: boolean;
}) {
	return (
		<form
			action={
				async() => {
					"use server";
					try {
						await signIn(provider, { redirectTo: "/panel/personal" });
					} catch(error) {
						if(error instanceof AuthError) {
							redirect(`/auth/error?error=${error.type}`);
						}

						throw error;
					}
				}
			}
		>
			<Button type="submit" variant={outline ? "outline" : "default"} className="w-full">
				{ children }
			</Button>
		</form>
	);
}
