import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
	return (
		<>
			<CardHeader>
				<CardTitle className="text-2xl">{ "Error" }</CardTitle>
				<CardDescription>
					{ "An error occurred while attempting to authenticate." }
					<br />
					{ "Please " }
					<Link href="/contact">
						<Button variant="link" className="p-0 h-min">
							{ "contact us" }
						</Button>
					</Link>
					{ " if the issue persists." }
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Link href="/auth/login" className="w-full">
					<Button variant="outline" className="w-full">
						{ "Retry Login" }
					</Button>
				</Link>
			</CardContent>
		</>
	);
}
