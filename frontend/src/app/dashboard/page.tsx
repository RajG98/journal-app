// app/dashboard/page.tsx
"use client"
import { Suspense } from "react";
import DashBoardContent from "./DashBoardContent";


export default function DashboardPage() {
    
	return (
		<main className="p-8">
			<h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
			<Suspense fallback={<p>Loading data...</p>}>
				<DashBoardContent />
			</Suspense>
		</main>
	);
}
