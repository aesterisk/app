import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// eslint-disable-next-line new-cap
export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GitHub],
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	callbacks: {
	},
});
