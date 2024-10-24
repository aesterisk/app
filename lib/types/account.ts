import { createPersonalTeam, addAccountToTeam, UserTeam, fromDB as teamFromDB } from "@/lib/types/team";
import { sql } from "@/lib/db";

export type Account = {
	id: number;
	email: string;
	firstName: string;
	lastName: string | null;
	avatar: string;
	createdAt: number;
	lastActive: number;
	personalTeam: UserTeam;
	otherTeams: UserTeam[];
};

export async function createAccount(
	ghId: string,
	email: string,
	firstName: string,
	lastName: string | null,
	image: string | null
): Promise<Account> {
	const team = await createPersonalTeam();
	const { rows } = await sql`INSERT INTO aesterisk.accounts (account_gh_id, account_email, account_first_name, account_last_name, account_avatar, account_created_at, account_last_active_at, account_personal_team) VALUES (${ghId}, ${email}, ${firstName}, ${lastName}, ${image}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ${team.id}) RETURNING account_id, account_gh_id, account_email, account_first_name, account_last_name, account_avatar, extract(epoch from account_created_at) as account_created_at, extract(epoch from account_last_active_at) as account_last_active_at, account_personal_team`;

	if(rows.length !== 1) {
		throw new Error(`Account not created\nemail: ${email}\nfirstName: ${firstName}\nlastName: ${lastName}}`);
	}

	const user = await addAccountToTeam(rows[0].account_id, team.id, true);

	return {
		id: rows[0].account_id,
		email: rows[0].account_email,
		firstName: rows[0].account_first_name,
		lastName: rows[0].account_last_name,
		avatar: rows[0].account_avatar,
		createdAt: Number(rows[0].account_created_at),
		lastActive: Number(rows[0].account_last_active_at),
		personalTeam: {
			user: user.id,
			team,
			owner: true,
			joinedAt: Number(rows[0].account_created_at),
		},
		otherTeams: [],
	} satisfies Account;
}

export function userTeamFromDB(row: any): UserTeam {
	return {
		user: row.user_id,
		team: teamFromDB(row),
		owner: row.user_owner,
		joinedAt: Number(row.user_joined_at),
	} satisfies UserTeam;
}

export function fromDB(rows: any[]): Account {
	if(rows.length < 1) {
		throw new Error("Expected at least one row (account.ts)");
	}

	const personalTeam = rows.find((row) => row.team_is_personal === true);
	const otherTeams = rows.filter((row) => row.team_is_personal === false);

	return {
		id: rows[0].account_id,
		email: rows[0].account_email,
		firstName: rows[0].account_first_name,
		lastName: rows[0].account_last_name,
		avatar: rows[0].account_avatar,
		createdAt: Number(rows[0].account_created_at),
		lastActive: Number(rows[0].account_last_active_at),
		personalTeam: userTeamFromDB(personalTeam),
		otherTeams: otherTeams.map(userTeamFromDB),
	} satisfies Account;
}

export async function getAccountByGhId(ghId: string): Promise<Account | null> {
	const { rows } = await sql`
		SELECT
			account_id,
			account_gh_id,
			account_first_name,
			account_last_name,
			account_avatar,
			extract(epoch from account_created_at) as account_created_at,
			extract(epoch from account_last_active_at) as account_last_active_at,
			user_id,
			extract(epoch from user_joined_at) as user_joined_at,
			user_owner,
			team_id,
			team_path,
			team_name,
			team_plan,
			team_is_personal,
			extract(epoch from team_created_at) as team_created_at
		FROM aesterisk.accounts
		LEFT JOIN aesterisk.users ON accounts.account_id = users.user_account
		LEFT JOIN aesterisk.teams ON users.user_team = teams.team_id
		WHERE accounts.account_gh_id = ${ghId}
	`;

	if(rows.length < 1) {
		return null;
	}

	return fromDB(rows);
}

export async function getAccountOrCreate(
	queryGhId: string,
	queryEmail: string,
	queryFirstName: string,
	queryLastName: string | null,
	queryImage: string | null
): Promise<Account> {
	const acc = await getAccountByGhId(queryGhId);
	if(!acc) return await createAccount(queryGhId, queryEmail, queryFirstName, queryLastName, queryImage);
	return acc;
}
