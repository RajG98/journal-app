"use client";

import { useState } from "react";
import api from "../../../api";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
    if (email && password) {
      const response = await api.post("/login", { email, password });
      console.log(response);
		} else {
			alert("Please fill all your details!");
		}
  };
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6">Login to DevLog</h2>
				<form
					onSubmit={handleLogin}
					className="space-y-5"
				>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email address
						</label>
						<input
							id="email"
							type="email"
							required
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							required
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
					>
						Log In
					</button>
				</form>
				<p className="mt-4 text-sm text-center text-gray-600">
					Don’t have an account?{" "}
					<a
						href="/signup"
						className="text-blue-600 hover:underline"
					>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}
