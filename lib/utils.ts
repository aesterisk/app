import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
