export type Plan = {
	id: string;
	name: string;
	color: string;
	maxUsers?: number;
	maxNodes: number;
	maxRoles?: number;
	personal: boolean;
	team: boolean;
};

export const plans: Plan[] = [
	{
		id: "free",
		name: "Free",
		color: "bg-slate-300",
		maxNodes: 1,
		personal: true,
		team: false,
	},
	{
		id: "plus",
		name: "Plus",
		color: "bg-rose-300",
		maxUsers: 3,
		maxNodes: 2,
		personal: true,
		team: true,
	},
	{
		id: "pro",
		name: "Pro",
		color: "bg-yellow-300",
		maxUsers: 5,
		maxNodes: 0, // unlimited
		maxRoles: 2,
		personal: true,
		team: true,
	},
	{
		id: "enterprise",
		name: "Enterprise",
		color: "bg-emerald-300",
		maxUsers: 0, // unlimited
		maxNodes: 0, // unlimited
		maxRoles: 0, // unlimited
		personal: false,
		team: true,
	},
];

export type Team = {
	id: number;
	path: string;
	name: string;
	plan: "free" | "plus" | "pro" | "enterprise"; // free = 0, plus = 1, pro = 2, enterprise = 3
	isPersonal: boolean;
	createdAt: number;
	roles: number[];
	nodes: number[];
};

export type Account = {
	id: number;
	email: string;
	firstName: string;
	lastName?: string;
	createdAt: number;
	lastActive: number;
	personalTeam: number;
};

export type User = {
	account: number;
	team: number;
	joinedAt: number;
	owner: boolean;
	roles: number[];
};

export type Role = {
	id: number;
	name: string;
	permissions: number[];
};
