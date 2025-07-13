import { useEffect, useState } from "react";
import api from "@/src/app/utils/api"; // your axios instance

interface Log {
	id: string;
	title: string;
	content: string;
	tags: string;
	isPublic: boolean;
	createdAt: string;
	updatedAt: string;
}


export default function DashboardContent() {
	const [logs, setLogs] = useState<Log[]>([]);

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const res = await api.get("/api/logs");
                setLogs(res.data);


			} catch (error) {
				console.error(error);
			}
		};

		fetchLogs();
	}, []);

	return (
		<div>
			<h2 className="text-xl mb-2">Recent Logs</h2>
			<ul className="list-disc pl-6">
				{logs.map((log) => (
					<li key={log.id}>{log.title}</li>
				))}
			</ul>
		</div>
	);
}
