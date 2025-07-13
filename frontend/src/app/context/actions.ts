"use server";
import { cookies } from "next/headers";

export async function setCookies(key: string, token: string) {
    const cookieStore = await cookies();
    
	cookieStore.set(key, token);
}

export async function deleteCookies(key: string) {
	const cookieStore = await cookies();
	cookieStore.delete(key);
}
