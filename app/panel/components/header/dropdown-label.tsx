import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import React from "react";
import { getAccount } from "@/app/panel/caches/account";

export default async function AesteriskDropdownLabel() {
	const account = await getAccount();

	if(!account) return <></>;

	return (
		<DropdownMenuLabel>{ account.lastName === null ? account.firstName : `${account.firstName} ${account.lastName}` }</DropdownMenuLabel>
	);
}
