import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function StatsCard({
	title,
	description,
	value,
	prefix,
	id,
}: {
	title: string;
	description: string;
	value: number;
	prefix: string;
	id: string;
}) {
	const displayValue = value.toFixed(1);

	return (
		<Card className="relative w-full h-full" id={id}>
			<CardHeader className="pb-2">
				<CardDescription>
					<span>{ title }</span>
					{ /* todo: add chart viewer */ }
					<Button variant="outline" size="icon" className="absolute right-4 top-4">
						{ " " }
						<LineChart className="h-4 w-4" />
					</Button>
				</CardDescription>
				<CardTitle className="text-4xl">{ `${displayValue}${prefix}` }</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-xs text-muted-foreground">{ description }</div>
			</CardContent>
			<CardFooter>
				<Progress value={value} aria-label={`${displayValue}${prefix}`} className="mt-2" />
			</CardFooter>
		</Card>
	);
}
