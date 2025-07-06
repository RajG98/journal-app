import type { NextAuthConfig } from "next-auth";
export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const path = nextUrl.pathname;

			const protectedRoutes = ["/dashboard", "/logs", "/"];
			const publicRoutes = ["/login", "/register"];

			const isProtectedRoute = protectedRoutes.some((route) =>
				path.startsWith(route)
			);
			const isPublicRoute = publicRoutes.includes(path);

			// 🔒 If user tries to access a protected route without login
			if (isProtectedRoute && !isLoggedIn) {
				return false; // Default redirect to login
			}

			// 🚫 If logged-in user tries to access public routes (like /login)
			if (isLoggedIn && isPublicRoute) {
				return Response.redirect(new URL("/dashboard", nextUrl));
			}

			// ✅ Allow access to all other cases
			return true;
        },
        
	},
	providers: [],
} satisfies NextAuthConfig;
