import { sql } from "@/lib/db";

export type Node = {
	id: number;
	name: string;
	lastActive: number;
	token: string;
	salt: string;
	lastExternalIp: string;
	ipLocked: boolean;
	uuid: string;
	networkIpRange: string;
};

export function fromDB(row: any): Node {
	return {
		id: row.node_id,
		name: row.node_name,
		lastActive: row.node_last_active_at,
		token: row.node_token,
		salt: row.node_salt,
		lastExternalIp: row.node_last_external_ip,
		ipLocked: row.node_ip_locked,
		uuid: row.node_uuid,
		networkIpRange: row.node_network_ip_range,
	} satisfies Node;
}

export async function getNodeById(id: number): Promise<Node | null> {
	const { rows } = await sql`SELECT node_id, node_name, extract(epoch from node_last_active_at) as node_last_active_at, node_token, node_salt, node_last_external_ip, node_ip_locked, node_uuid, node_network_ip_range FROM aesterisk.nodes WHERE node_id = ${id}`;

	if(rows.length !== 1) {
		return null;
	}

	return fromDB(rows[0]);
}

export async function getTeamNodes(team: number): Promise<Node[]> {
	const { rows } = await sql`SELECT nodes.node_id, node_name, extract(epoch from node_last_active_at) as node_last_active_at, node_token, node_salt, node_last_external_ip, node_ip_locked, node_uuid, node_network_ip_range FROM aesterisk.nodes LEFT JOIN aesterisk.team_nodes ON nodes.node_id = team_nodes.node_id WHERE team_id = ${team}`;
	return rows.map(fromDB);
}
