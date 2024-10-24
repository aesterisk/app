import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import LoginButton from "@/app/auth/login/components/login-button";

export default function LoginPage() {
	return (
		<>
			<CardHeader>
				<CardTitle className="text-2xl">{ "Login" }</CardTitle>
				<CardDescription>
					{ "Streamline your experience with our GitHub integration" }
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					{ /* <div className="grid gap-2">*/ }
					<LoginButton provider="github">{ "Login with Github" }</LoginButton>
					{ /* </div>*/ }
					{ /* <Separator />*/ }
					{ /* <div className="grid gap-2">*/ }
					{ /* <LoginButton provider="not-implemented" outline>{ "Continue with SAML SSO" }</LoginButton> */ }
					{ /* <LoginButton provider="not-implemented" outline>{ "Continue with a Passkey" }</LoginButton> */ }
					{ /* </div>*/ }
				</div>
			</CardContent>
		</>
	);
}
