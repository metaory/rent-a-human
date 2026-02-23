"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AgentProfileById } from "../agent-profile-by-id";

function AgentProfileContent() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	if (!id) {
		return (
			<div className="flex min-h-screen flex-col">
				<Header />
				<main className="flex flex-1 items-center justify-center px-4">
					<p className="text-muted-foreground">Missing agent id.</p>
				</main>
				<Footer />
			</div>
		);
	}
	return <AgentProfileById id={id} />;
}

export default function AgentProfilePage() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen flex-col">
					<Header />
					<main className="flex flex-1 items-center justify-center px-4">
						<p className="text-muted-foreground">Loading…</p>
					</main>
					<Footer />
				</div>
			}
		>
			<AgentProfileContent />
		</Suspense>
	);
}
