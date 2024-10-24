import { DataTable } from "@/app/panel/[teamID]/(routes)/nodes/components/list/table";
import { columns } from "@/app/panel/[teamID]/(routes)/nodes/components/list/columns";
import { getTeamNodes } from "@/lib/types/node";
import { getTeam } from "@/app/panel/caches/team";

export default async function List() {
	const team = await getTeam();
	if(!team) {
		throw new Error("List requires a team!");
	}

	const nodes = await getTeamNodes(team.team.id);

	return (
		<DataTable columns={columns} data={nodes} />
	);
}
