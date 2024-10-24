import { cache } from "react";
import { getAccountOrCreate } from "@/lib/types/account";
import { auth } from "@/lib/auth";

const getCachedAccount = cache(getAccountOrCreate);

export async function getAccount() {
	const session = await auth();
	if(!session) return null;

	const { user } = session;
	if(!user) return null;

	const [firstName, lastName] = [...(user.name?.split(" ") ?? ["AesteriskNoFirstName", "AesteriskNoLastName"]), null];

	return await getCachedAccount(user.ghId, user.email as string, firstName!, lastName, user.image ?? null);
}
