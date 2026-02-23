"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useStore } from "@/lib/store";
import { Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function CategoriesPage() {
	const { categories, addCategory } = useStore();
	const [newCategoryName, setNewCategoryName] = useState("");

	function handleCreate(e: React.FormEvent) {
		e.preventDefault();
		const name = newCategoryName.trim();
		if (!name) return;

		const existing = categories.find(
			(c) => c.name.toLowerCase() === name.toLowerCase(),
		);
		if (existing) {
			toast.error("Category already exists");
			return;
		}

		addCategory(name);
		setNewCategoryName("");
		toast.success(`Category "${name}" created`);
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
					<div>
						<span className="font-mono text-xs uppercase tracking-widest text-primary">
							Categories
						</span>
						<h1 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
							All Categories
						</h1>
						<p className="mt-2 text-sm text-muted-foreground">
							Browse existing categories or create your own. Categories can be
							anything -- if it doesn{"'"}t exist yet, make it.
						</p>
					</div>

					{/* Create new category */}
					<form onSubmit={handleCreate} className="mt-8 flex max-w-md gap-3">
						<div className="flex flex-1 items-center border border-dashed border-border bg-card transition-colors focus-within:border-primary">
							<div className="px-3 text-muted-foreground">
								<Plus className="h-4 w-4" />
							</div>
							<input
								type="text"
								value={newCategoryName}
								onChange={(e) => setNewCategoryName(e.target.value)}
								placeholder="Type a new category..."
								className="flex-1 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
							/>
						</div>
						<button
							type="submit"
							className="bg-primary px-4 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
						>
							Create
						</button>
					</form>

					{/* Category grid */}
					<div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{categories.map((cat) => (
							<Link
								key={cat.id}
								href={`/agents?category=${cat.slug}`}
								className="group flex flex-col gap-3 border border-border bg-card p-5 transition-all hover:border-primary/50"
							>
								<div className="flex items-start justify-between">
									<h3 className="text-sm font-semibold text-foreground">
										{cat.name}
									</h3>
									<ArrowRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
								</div>
								<p className="text-xs leading-relaxed text-muted-foreground">
									{cat.description}
								</p>
								<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
									{cat.agentCount} agent{cat.agentCount !== 1 ? "s" : ""}
								</span>
							</Link>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
