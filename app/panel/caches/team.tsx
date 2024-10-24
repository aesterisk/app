import { UserTeam } from "@/lib/types/team";
import { getAccount } from "@/app/panel/caches/account";
import { redirect } from "next/navigation";

let currentPath = "personal";
export const setPath = (path: string) => {
	currentPath = path;
};

export async function getTeam(): Promise<UserTeam | null> {
	const account = await getAccount();
	if(!account) return null;

	if(currentPath === "personal") {
		return account.personalTeam;
	}

	const team = account.otherTeams.find((t) => t.team.path === currentPath);

	// todo: display an error message if team is unavailable, with a link back to the personal team
	if(!team) redirect("/panel/personal");

	return team;
}
