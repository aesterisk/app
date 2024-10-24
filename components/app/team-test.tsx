import { getTeam } from "@/app/panel/caches/team";

export default async function TeamTest() {
	const team = JSON.stringify(await getTeam(), null, 2);

	return (
		<span>
			{ "Current Team:" }
			<br />
			{ team }
		</span>
	);
}
