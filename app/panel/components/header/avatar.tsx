import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAccount } from "@/app/panel/caches/account";
import { getPrimaryChars } from "@/lib/utils";

export default async function AesteriskAvatar() {
	const account = await getAccount();

	if(account) {
		return (
			<>
				<AvatarImage src={account.avatar} alt="Account avatar" />
				<AvatarFallback>{ getPrimaryChars(account.lastName === null ? account.firstName : `${account.firstName} ${account.lastName}`) }</AvatarFallback>
			</>
		);
	}

	return <></>;
}
