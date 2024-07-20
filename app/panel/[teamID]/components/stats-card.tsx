import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { mapValue } from "@/lib/utils";

export default function StatsCard({
	title,
	description,
	minValue,
	value,
	maxValue,
	prefix,
	id,
	warningStop,
	dangerStop,
}: {
	title: string;
	description: string;
	minValue?: number;
	value: number;
	maxValue?: number;
	prefix: string;
	id: string;
	warningStop: number;
	dangerStop: number;
}) {
	const displayValue = value.toFixed(1);
	const percentage = mapValue(value, minValue ?? 0, maxValue ?? 100, 0, 100);
	const color = percentage >= dangerStop ? "bg-rose-300" : value >= warningStop ? "bg-yellow-300" : "bg-primary";

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
				<Progress value={percentage} aria-label={`${displayValue}${prefix}`} className={color} />
			</CardFooter>
		</Card>
	);
}
