"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getAgent } from "@/lib/api";
import type { Agent } from "@/lib/data";
import { AgentProfileClient } from "./[id]/agent-profile-client";

function NotFound() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex flex-1 items-center justify-center px-4">
				<p className="text-muted-foreground">Agent not found.</p>
			</main>
			<Footer />
		</div>
	);
}

export function AgentProfileById({ id }: { id: string }) {
	const [agent, setAgent] = useState<Agent | null | undefined>(undefined);

	useEffect(() => {
		getAgent(id).then(setAgent);
	}, [id]);

	if (agent === undefined) {
		return (
			<div className="flex min-h-screen flex-col">
				<Header />
				<main className="flex flex-1 items-center justify-center px-4">
					<p className="text-muted-foreground">Loading…</p>
				</main>
				<Footer />
			</div>
		);
	}
	if (!agent) return <NotFound />;
	return <AgentProfileClient agent={agent} agentReviews={[]} />;
}
