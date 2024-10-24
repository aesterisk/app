import { ReactNode } from "react";
import StatsCard from "@/app/panel/[teamID]/components/stats-card";
import DashboardGrid from "@/app/panel/[teamID]/components/dashboard-grid";
import TeamTest from "@/components/app/team-test";

export default async function Home() {
	const widgets: { id: string; card: ReactNode; }[] = [
		{
			id: "ram",
			card: <StatsCard title="RAM Usage" description="of 32GB total memory" value={15.32} maxValue={32} warningStop={80} dangerStop={90} prefix="GB" id="ram" />,
		},
		{
			id: "cpu",
			card: <StatsCard title="CPU Usage" description="across all active nodes" value={78.154} warningStop={80} dangerStop={90} prefix="%" id="cpu" />,
		},
		{
			id: "disk",
			card: <StatsCard title="Disk Usage" description="of 1TB total storage" value={0.32} maxValue={1} warningStop={80} dangerStop={95} prefix="TB" id="disk" />,
		},
	];

	return (
		<main className="px-4 py-5 w-full relative">
			<DashboardGrid items={widgets} />
			<TeamTest />
		</main>
	);
}
