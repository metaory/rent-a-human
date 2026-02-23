"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { ArrowRight, Plus } from "lucide-react";

export function FeaturedCategories() {
	const { categories } = useStore();

	return (
		<section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
			<div className="flex items-end justify-between">
				<div>
					<span className="font-mono text-xs uppercase tracking-widest text-primary">
						Categories
					</span>
					<h2 className="mt-2 text-balance text-2xl font-bold text-foreground md:text-3xl">
						Whatever you need done
					</h2>
				</div>
				<Link
					href="/categories"
					className="hidden items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary md:flex"
				>
					View all <ArrowRight className="h-3 w-3" />
				</Link>
			</div>

			<div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
				{categories.map((cat) => (
					<Link
						key={cat.id}
						href={`/agents?category=${cat.slug}`}
						className="group flex flex-col gap-2 border border-border bg-card p-4 transition-all hover:border-primary/50"
					>
						<span className="text-sm font-medium text-foreground">
							{cat.name}
						</span>
						<span className="font-mono text-xs text-muted-foreground">
							{cat.agentCount} agents
						</span>
					</Link>
				))}

				<Link
					href="/categories"
					className="flex flex-col items-center justify-center gap-2 border border-dashed border-border p-4 transition-colors hover:border-primary hover:text-primary"
				>
					<Plus className="h-5 w-5 text-muted-foreground" />
					<span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
						Add Category
					</span>
				</Link>
			</div>
		</section>
	);
}
