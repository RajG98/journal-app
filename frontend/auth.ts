import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "./api"; // your axios/fetch wrapper

export const { signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const res = await api.post("/login", {
					email: credentials.email,
					password: credentials.password,
				});

				const data = await res.json(); // 🔴 You had a bug here: missing `await`

				if (!res.ok || !data?.token || !data?.user?.id) return null;

				return {
					id: String(data.user.id),
					name: data.user.name,
					email: data.user.email,
					accessToken: data.token, // ✅ stored in token.user.accessToken
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user; // Custom structure
			}
			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
});
