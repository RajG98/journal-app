"use client"
import React, { useEffect, useState } from "react";
import {
	Search,
	Plus,
	Filter,
	User,
	LogOut,
	Mail,
	Github,
	Twitter,
	Calendar,
	Clock,
	Tag,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "../utils/api";
import { UUID } from "crypto";
interface Log{
	id:string
	title: string,
	content: string,
	tags: Array<string>,
	date: string, 
	time:string
}

const DevLogApp = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [showNewLogForm, setShowNewLogForm] = useState(false);
	const [newLogTitle, setNewLogTitle] = useState("");
	const [newLogContent, setNewLogContent] = useState("");
	const [newLogTags, setNewLogTags] = useState("");
	useEffect(() => {
		const fetchLogs =async () => {
			
			const response = await api.get('/api/logs');
			console.log(response.data)
			setLogs(response.data);
		}
		fetchLogs();
	},[])

	const [logs, setLogs] = useState<Array<Log>>([{
		id:"",
		title: "",
		content: "",
		tags: ["jhh"],
		date: "",
		time:""
	}	]);

	const filterOptions = [
		{ value: "all", label: "All Logs" },
		{ value: "frontend", label: "Frontend" },
		{ value: "backend", label: "Backend" },
		{ value: "bug-fix", label: "Bug Fixes" },
		{ value: "deployment", label: "Deployment" },
	];

	const filteredLogs = logs.filter((log) => {
		const matchesSearch =
			log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.tags.some((tag) =>
				tag.toLowerCase().includes(searchTerm.toLowerCase())
			);

		const matchesFilter =
			selectedFilter === "all" || log.tags.includes(selectedFilter);

		return matchesSearch && matchesFilter;
	});

	const handleSignIn = () => {
		setIsSignedIn(true);
	};

	const handleSignOut = () => {
		setIsSignedIn(false);
	};

	const handleNewLog = async () => {
		if (newLogTitle && newLogContent) {
			const newLog = {
				title: newLogTitle,
				content: newLogContent,
				tags: newLogTags
				.split(",")
				.map((tag) => tag.trim())
				.filter((tag) => tag),
			}
			const response=await api.post('/api/logs', newLog);
			setLogs([response.data, ...logs]);
			setNewLogTitle("");
			setNewLogContent("");
			setNewLogTags("");
			setShowNewLogForm(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Navbar */}
			<nav className="bg-white shadow-sm border-b">
				<div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<h1 className="text-xl font-bold text-gray-900">DevLog</h1>
						</div>

						<div className="flex items-center space-x-4">
							{isSignedIn ? (
								<div className="flex items-center space-x-2">
									<span className="text-sm text-gray-700">
										Welcome, Developer!
									</span>
									<button
										onClick={handleSignOut}
										className="flex items-center space-x-1 px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
									>
										<LogOut className="w-4 h-4" />
										<span>Sign Out</span>
									</button>
								</div>
							) : (
								<button
									onClick={handleSignIn}
									className="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
								>
									<User className="w-4 h-4" />
									<span>Sign In</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Search and Filter Bar */}
				<div className="mb-8 space-y-4">
					<div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
						<div className="relative flex-1 max-w-lg">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
							<input
								type="text"
								placeholder="Search logs..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<Filter className="w-4 h-4 text-gray-500" />
								<select
									value={selectedFilter}
									onChange={(e) => setSelectedFilter(e.target.value)}
									className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									{filterOptions.map((option) => (
										<option
											key={option.value}
											value={option.value}
										>
											{option.label}
										</option>
									))}
								</select>
							</div>

							{isSignedIn && (
								<button
									onClick={() => setShowNewLogForm(true)}
									className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
								>
									<Plus className="w-4 h-4" />
									<span>New Log</span>
								</button>
							)}
						</div>
					</div>
				</div>

				{/* New Log Form */}
				{showNewLogForm && (
					<div className="mb-8 p-6 bg-white rounded-lg shadow-sm border">
						<h2 className="text-lg font-semibold mb-4">Create New Log Entry</h2>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Log title..."
								value={newLogTitle}
								onChange={(e) => setNewLogTitle(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							<textarea
								placeholder="Describe what you worked on..."
								value={newLogContent}
								onChange={(e) => setNewLogContent(e.target.value)}
								rows={4}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							<input
								type="text"
								placeholder="Tags (comma separated)"
								value={newLogTags}
								onChange={(e) => setNewLogTags(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
							<div className="flex space-x-2">
								<button
									onClick={handleNewLog}
									className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
								>
									Save Log
								</button>
								<button
									onClick={() => setShowNewLogForm(false)}
									className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Sign In Alert */}
				{!isSignedIn && (
					<Alert className="mb-6">
						<AlertDescription>
							Sign in to create new log entries and access additional features.
						</AlertDescription>
					</Alert>
				)}

				{/* Logs Feed */}
				<div className="space-y-6">
					<h2 className="text-2xl font-bold text-gray-900">
						Development Logs ({filteredLogs.length})
					</h2>

					{filteredLogs.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-gray-500">
								No logs found matching your criteria.
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{filteredLogs.map((log) => (
								<div
									key={log.id}
									className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
								>
									<div className="flex items-start justify-between mb-3">
										<h3 className="text-lg font-semibold text-gray-900">
											{log.title}
										</h3>
										<div className="flex items-center space-x-2 text-sm text-gray-500">
											<Calendar className="w-4 h-4" />
											<span>{log.date}</span>
											<Clock className="w-4 h-4" />
											<span>{log.time}</span>
										</div>
									</div>

									<p className="text-gray-700 mb-4 leading-relaxed">
										{log.content}
									</p>

									<div className="flex items-center space-x-2">
										<Tag className="w-4 h-4 text-gray-400" />
										<div className="flex flex-wrap gap-2">
											{log.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-gray-800 text-white mt-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<h3 className="text-lg font-semibold mb-4">DevLog</h3>
							<p className="text-gray-300">
								Track your development progress and document your coding
								journey.
							</p>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
							<ul className="space-y-2 text-gray-300">
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors"
									>
										Dashboard
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors"
									>
										All Logs
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-white transition-colors"
									>
										Settings
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="text-lg font-semibold mb-4">Contact Me</h4>
							<div className="space-y-3">
								<a
									href="mailto:developer@example.com"
									className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
								>
									<Mail className="w-4 h-4" />
									<span>developer@example.com</span>
								</a>
								<a
									href="https://github.com"
									className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
								>
									<Github className="w-4 h-4" />
									<span>GitHub</span>
								</a>
								<a
									href="https://twitter.com"
									className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
								>
									<Twitter className="w-4 h-4" />
									<span>Twitter</span>
								</a>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
						<p>&copy; 2025 DevLog. Built with React and shadcn/ui.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default DevLogApp;
