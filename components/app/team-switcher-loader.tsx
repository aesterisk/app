import { getTeam } from "@/app/panel/caches/team";
import TeamSwitcher from "@/components/app/team-switcher";
import { getAccount } from "@/app/panel/caches/account";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// todo: clean this up (team-switcher[|-loader|-loading].tsx is not really a good pattern)
export default async function TeamSwitcherLoader() {
	const refresh = async(path: string) => {
		"use server";
		revalidatePath("/panel/[teamID]", "layout");
		redirect(`/panel/${path}`);
	};

	const account = await getAccount();
	if(!account) throw new Error("TeamSwitcherLoader requires an account!");

	const team = await getTeam();

	return (
		<TeamSwitcher
			selectedTeam={team}
			personalTeam={account.personalTeam}
			otherTeams={account.otherTeams}
			refresh={refresh}
		/>
	);
}
