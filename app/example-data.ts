import { Team } from "@/lib/types";

export const teams: Team[] = [
	{
		id: 0,
		path: "personal",
		name: "Personal",
		plan: "free",
		isPersonal: true,
		createdAt: Date.now(),
		roles: [],
		nodes: [],
	} as Team,
	...[
		{
			id: 1,
			path: "acme-inc",
			name: "Acme Inc.",
			plan: "plus",
			isPersonal: false,
			createdAt: Date.now(),
			roles: [],
			nodes: [],
		} as Team,
		{
			id: 2,
			path: "monsters-inc",
			name: "Monsters Inc.",
			plan: "pro",
			isPersonal: false,
			createdAt: Date.now(),
			roles: [],
			nodes: [],
		} as Team,
		{
			id: 3,
			path: "aperture-science",
			name: "Aperture Science",
			plan: "enterprise",
			isPersonal: false,
			createdAt: Date.now(),
			roles: [],
			nodes: [],
		} as Team,
	].sort((item1, item2) => item1.name.localeCompare(item2.name)),
];
