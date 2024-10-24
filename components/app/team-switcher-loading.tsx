import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronsUpDown } from "lucide-react";

export default function TeamSwitcherLoading() {
	return (
		<Button
			variant="outline"
			role="combobox"
			aria-label="Select a team"
			className="w-full justify-between px-[13px]"
		>
			<Skeleton className="h-5 w-5 mr-[11px] rounded-full" />
			<Skeleton className="h-2 w-28" />
			<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
		</Button>
	);
}
