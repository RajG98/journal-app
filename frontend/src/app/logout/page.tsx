"use client"
import { useContext, useEffect } from "react";
import { AuthContext } from "@/src/app/context/AuthContext";
import { useRouter } from "next/navigation";


export default function Logout() {
    const { logout } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        logout();    
        router.push('/login');
    },[])
}