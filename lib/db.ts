import { db } from "@vercel/postgres";
import { Account, Team } from "@/lib/types";

const { sql } = await db.connect();

export async function createPersonalTeam(): Promise<Team> {
	const now = Date.now();
	const { rows } = await sql`INSERT INTO teams (path, name, plan, created_at, is_personal) VALUES ('personal', 'Personal', 'free', ${now}, true) RETURNING *`;

	if(rows.length !== 1) {
		throw new Error("Personal team not created");
	}

	const [{ id, path, name, plan, created_at: createdAt, is_personal: isPersonal, roles, nodes }] = rows;

	return {
		id,
		path,
		name,
		plan,
		createdAt,
		isPersonal,
		roles,
		nodes,
	};
}

export async function createAccount(
	queryEmail: string,
	queryFirstName: string,
	queryLastName?: string
): Promise<Account> {
	const now = Date.now();
	const team = await createPersonalTeam();
	const { rows } = await sql`INSERT INTO accounts (email, first_name, last_name, created_at, last_active, personal_team) VALUES (${queryEmail}, ${queryFirstName}, ${queryLastName ?? null}, ${now}, ${now}, ${team.id}) RETURNING *`;

	if(rows.length !== 1) {
		throw new Error(`Account not created\nqueryEmail: ${queryEmail}\nqueryFirstName: ${queryFirstName}\nqueryLastName: ${queryLastName}}`);
	}

	const [
		{
			id,
			email,
			first_name: firstName,
			last_name: lastName,
			created_at: createdAt,
			last_active: lastActive,
			personal_team: personalTeam,
		},
	] = rows;

	return {
		id,
		email,
		firstName,
		lastName,
		createdAt,
		lastActive,
		personalTeam,
	};
}

export async function getAccountByEmail(queryEmail: string): Promise<Account> {
	const { rows } = await sql`SELECT * FROM accounts WHERE email = ${queryEmail} LIMIT 1`;

	if(rows.length !== 1) {
		throw new Error(`Account not found\nqueryEmail: ${queryEmail}`);
	}

	const [
		{
			id,
			email,
			first_name: firstName,
			last_name: lastName,
			created_at: createdAt,
			last_active: lastActive,
			personal_team: personalTeam,
		},
	] = rows;

	return {
		id,
		email,
		firstName,
		lastName,
		createdAt,
		lastActive,
		personalTeam,
	};
}

export async function getAccountById(queryId: number): Promise<Account> {
	const { rows } = await sql`SELECT * FROM accounts WHERE id = ${queryId} LIMIT 1`;

	if(rows.length !== 1) {
		throw new Error(`Account not found\nqueryId: ${queryId}`);
	}

	const [{ id, email, firstName, lastName, createdAt, lastActive, personalTeam }] = rows;

	return {
		id,
		email,
		firstName,
		lastName,
		createdAt,
		lastActive,
		personalTeam,
	};
}

export async function getAccountOrCreate(
	queryEmail: string,
	queryFirstName: string,
	queryLastName?: string
): Promise<Account> {
	try {
		return await getAccountByEmail(queryEmail);
	} catch(_) {
		return await createAccount(queryEmail, queryFirstName, queryLastName);
	}
}
