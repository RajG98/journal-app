import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";


export function middleware(req: NextRequest) {
	const encryptedToken = req.cookies.get("jwt-token")?.value || "";
	const { pathname, origin } = req.nextUrl;
	
	// console.log("Token:", encryptedToken);

	const decryptedToken = parseJwt(encryptedToken);
	
	const isTokenValid = decodeToken(decryptedToken);
	
	if (!isTokenValid) {
		// If the token is invalid and user already on the sign-in page,
		// redirect to /sign-in
		if (pathname !== "/login") {
			const loginUrl = new NextURL("/login", origin);
			return NextResponse.redirect(loginUrl);
		}
	} else {
		// If token is valid and trying to access sign-in, redirect to dashboard
		if (pathname === "/login") {
			const dashboardUrl = new NextURL("/dashboard", origin);
			return NextResponse.redirect(dashboardUrl);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*", // Protect dashboard route and sub-routes
		"/login",
		"/",
		"/about/:path",
		// Add more routes to protect
	],
};
// function to decode token validity
function decodeToken(token: any): boolean {
	try {

		if (!token || !token.exp) {
			return false;
		}

		const currentTime = Math.floor(Date.now() / 1000);
		return token.exp > currentTime;
	} catch (err) {
		console.error("Token decoding error:", err);
		return false;
	}
}
function parseJwt(token:string) {
	const base64Url = token.split(".")[1];
	if (!base64Url) return null;
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);
	return JSON.parse(jsonPayload);
}
