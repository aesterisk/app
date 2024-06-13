export type Plan = {
	id: string;
	name: string;
	color: string;
};

export type Team = {
	id: string;
	name: string;
	plan: Plan;
};

export type User = {
	id: string;
	name: string;
	email: string;
};
