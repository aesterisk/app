"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function NoMFAWarning({ mfaEnabled }: { mfaEnabled: boolean; }) {
	const toasted = useRef(false);

	useEffect(() => {
		if(!toasted.current && !mfaEnabled) {
			toasted.current = true;
			setTimeout(() => {
				toast.warning("2FA is not enabled", {
					description: "Please secure your account with 2FA",
					duration: Infinity,
					action: {
						label: "Settings",
						onClick: () => {
							window.open("https://github.com/settings/security#two-factor-authentication", "_blank noopener noreferrer");
						},
					},
				});
			});
		}
	});

	return <></>;
}
