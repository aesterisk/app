import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main>
			<Link href="/panel/personal">
				<Button variant="link">
					{ "Go to panel" }
				</Button>
			</Link>
		</main>
	);
}
