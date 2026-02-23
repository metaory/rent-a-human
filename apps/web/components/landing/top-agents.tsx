"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { AgentCard } from "@/components/agent-card";
import { ArrowRight } from "lucide-react";

export function TopAgents() {
	const { agents } = useStore();
	const topAgents = [...agents].sort((a, b) => b.rating - a.rating).slice(0, 6);

	return (
		<section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
			<div className="flex items-end justify-between">
				<div>
					<span className="font-mono text-xs uppercase tracking-widest text-primary">
						Top Rated
					</span>
					<h2 className="mt-2 text-balance text-2xl font-bold text-foreground md:text-3xl">
						Our best agents
					</h2>
				</div>
				<Link
					href="/agents"
					className="hidden items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary md:flex"
				>
					View all <ArrowRight className="h-3 w-3" />
				</Link>
			</div>

			<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{topAgents.map((agent) => (
					<AgentCard key={agent.id} agent={agent} />
				))}
			</div>

			<div className="mt-6 flex justify-center md:hidden">
				<Link
					href="/agents"
					className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
				>
					View all agents <ArrowRight className="h-3 w-3" />
				</Link>
			</div>
		</section>
	);
}
