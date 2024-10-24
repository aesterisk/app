import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

declare module "next-auth" {
	// eslint-disable-next-line no-unused-vars
	interface User {
		ghId: string;
		// todo: display warning toast on login if two-factor auth is not enabled
		twoFactor: boolean;
	}
}

// eslint-disable-next-line new-cap
export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		// eslint-disable-next-line new-cap
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
			profile(profile) {
				return {
					email: profile.email,
					name: profile.name,
					image: profile.avatar_url,
					twoFactor: profile.two_factor_authentication,
					ghId: profile.id.toString(10),
				};
			},
		}),
	],
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	callbacks: {
		jwt({ token, user }) {
			if(user) {
				token.ghId = user.ghId;
				token.twoFactor = user.twoFactor;
			}

			return token;
		},
		async session({ session, token }) {
			session.user.ghId = token.ghId as string;
			session.user.twoFactor = token.twoFactor as boolean;
			return session;
		},
	},
});
