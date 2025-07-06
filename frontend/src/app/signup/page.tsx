"use client";

import { useState } from "react";
import api from "../../../api";

export default function SignupPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
        if (confirmPassword && password === confirmPassword) {
            const response=await api.post('/login', { email, password });

        } else {
            alert("Password did not match!");
        }
    };
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6">
					Create Your DevLog Account
				</h2>
				<form
					onSubmit={handleSignup}
					className="space-y-5"
				>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Full Name <span style={{ color: "red" }}>*</span>
						</label>
						<input
							id="name"
							type="text"
							required
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="John Wick"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email address <span style={{ color: "red" }}>*</span>
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
							Password <span style={{ color: "red" }}>*</span>
						</label>
						<input
							id="password"
							type="password"
							required
							minLength={6}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
						/>
					</div>
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700"
						>
							Confirm Password <span style={{ color: "red" }}>*</span>
						</label>
						<input
							id="confirmPassword"
							type="password"
							required
							minLength={6}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="••••••••"
						/>
						{confirmPassword !== "" && password !== confirmPassword && (
							<small style={{ color: "red" }}>Password did not match</small>
						)}
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
					>
						Sign Up
					</button>
				</form>
				<p className="mt-4 text-sm text-center text-gray-600">
					Already have an account?{" "}
					<a
						href="/login"
						className="text-blue-600 hover:underline"
					>
						Log in
					</a>
				</p>
			</div>
		</div>
	);
}
