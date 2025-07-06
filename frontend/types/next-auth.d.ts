// types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			role?: string;
			accessToken?: string;
		} & DefaultSession["user"];
	}

	interface User {
		id: string;
		name?: string | null;
		email?: string | null;
		role?: string;
		accessToken?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user?: {
			id: string;
			name?: string | null;
			email?: string | null;
			role?: string;
			accessToken?: string;
		};
	}
}
