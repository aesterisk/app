import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Plan, plans } from "@/lib/types";
import { Team } from "@/lib/types/team";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getPrimaryChars(input: string) {
	const spaced = input.split(" ").map((word) => word.charAt(0)).join("").toUpperCase();
	if(spaced.length === 2) return spaced;

	return input.slice(0, 2).toUpperCase();
}

export function toTitleCase(input: string) {
	return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export function mapValue(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
	return ((value - inMin) * (outMax - outMin) / (inMax - inMin)) + outMin;
}

export function getPlan(team: Team): Plan {
	if(!team) return plans[0];

	switch(team.plan) {
		case "plus":
			return plans[1];
		case "pro":
			return plans[2];
		case "enterprise":
			return plans[3];
		default:
			return plans[0];
	}
}
