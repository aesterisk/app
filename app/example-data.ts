import { Plan, Team, User } from "@/lib/types";

export const plans: Plan[] = [
	{
		id: "free",
		name: "Free",
		color: "bg-slate-300",
	},
	{
		id: "pro",
		name: "Pro",
		color: "bg-yellow-300",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		color: "bg-emerald-300",
	},
];

export const personalTeam: Team = {
	id: "personal",
	name: "Personal",
	plan: plans[0],
};

export const user: User = {
	id: "user-0",
	name: "John Doe",
	email: "john@doe.com",
};

export const teams: Team[] = [
	{
		id: "acme-inc",
		name: "Acme Inc.",
		plan: plans[0],
	},
	{
		id: "monsters-inc",
		name: "Monsters Inc.",
		plan: plans[1],
	},
	{
		id: "aperture-science",
		name: "Aperture Science",
		plan: plans[2],
	},
].sort((item1, item2) => item1.name.localeCompare(item2.name));
