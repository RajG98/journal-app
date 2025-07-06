"use client"; 

import React, { createContext, useState, useEffect, ReactNode } from "react";



interface AuthContextType {
	jwtToken: string | null;
	login: (token: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	jwtToken: null,
	login: () => {},
	logout: () => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [jwtToken, setJwtToken] = useState<string | null>(null);

	useEffect(() => {
		const storedUser = sessionStorage.getItem("jwt-token");
		if (storedUser) {
			setJwtToken(storedUser);
		}
	}, []);

	const login = (token: string) => {
		setJwtToken(token);
		sessionStorage.setItem("jwt-token", token);
	};

	const logout = () => {
		setJwtToken(null);
		sessionStorage.removeItem("jwt-token");
	};

	return (
		<AuthContext.Provider value={{ jwtToken, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
