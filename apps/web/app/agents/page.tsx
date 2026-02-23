"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AgentCard } from "@/components/agent-card";
import { useStore } from "@/lib/store";
import { searchAgents } from "@/lib/data";
import { Search, SlidersHorizontal, X } from "lucide-react";

type SortOption = "rating" | "price-low" | "price-high" | "reviews";

export default function AgentsPage() {
	const searchParams = useSearchParams();
	const initialQuery = searchParams.get("q") || "";
	const initialCategory = searchParams.get("category") || "";

	const { agents, categories } = useStore();
	const [query, setQuery] = useState(initialQuery);
	const [selectedCategory, setSelectedCategory] = useState(initialCategory);
	const [sort, setSort] = useState<SortOption>("rating");
	const [minRating, setMinRating] = useState(0);
	const [availableOnly, setAvailableOnly] = useState(false);
	const [showFilters, setShowFilters] = useState(false);

	const filteredAgents = useMemo(() => {
		let result = query ? searchAgents(agents, query) : [...agents];

		if (selectedCategory) {
			const catName =
				categories.find((c) => c.slug === selectedCategory)?.name ||
				selectedCategory;
			result = result.filter((a) =>
				a.categories.some((c) => c.toLowerCase() === catName.toLowerCase()),
			);
		}

		if (minRating > 0) {
			result = result.filter((a) => a.rating >= minRating);
		}

		if (availableOnly) {
			result = result.filter((a) => a.available);
		}

		switch (sort) {
			case "rating":
				result.sort((a, b) => b.rating - a.rating);
				break;
			case "price-low":
				result.sort((a, b) => a.hourlyRate - b.hourlyRate);
				break;
			case "price-high":
				result.sort((a, b) => b.hourlyRate - a.hourlyRate);
				break;
			case "reviews":
				result.sort((a, b) => b.reviewCount - a.reviewCount);
				break;
		}

		return result;
	}, [
		agents,
		query,
		selectedCategory,
		sort,
		minRating,
		availableOnly,
		categories,
	]);

	function clearFilters() {
		setQuery("");
		setSelectedCategory("");
		setMinRating(0);
		setAvailableOnly(false);
		setSort("rating");
	}

	const hasActiveFilters =
		query || selectedCategory || minRating > 0 || availableOnly;

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
					{/* Page header */}
					<div className="flex flex-col gap-4">
						<div>
							<span className="font-mono text-xs uppercase tracking-widest text-primary">
								Browse
							</span>
							<h1 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
								All Agents
							</h1>
						</div>

						{/* Search + filter bar */}
						<div className="flex gap-3">
							<div className="flex flex-1 items-center border border-border bg-card transition-colors focus-within:border-primary">
								<div className="px-3 text-muted-foreground">
									<Search className="h-4 w-4" />
								</div>
								<input
									type="text"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder="Search agents, skills, locations..."
									className="flex-1 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
								/>
								{query && (
									<button
										onClick={() => setQuery("")}
										className="px-3 text-muted-foreground hover:text-foreground"
									>
										<X className="h-4 w-4" />
									</button>
								)}
							</div>
							<button
								onClick={() => setShowFilters(!showFilters)}
								className="flex items-center gap-2 border border-border bg-card px-4 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-primary md:hidden"
							>
								<SlidersHorizontal className="h-4 w-4" />
							</button>
						</div>

						{/* Filter bar - always visible on desktop, toggle on mobile */}
						<div
							className={`flex flex-col gap-3 md:flex-row md:items-center md:gap-4 ${showFilters ? "flex" : "hidden md:flex"}`}
						>
							{/* Category pills */}
							<div className="flex flex-wrap items-center gap-2">
								<button
									onClick={() => setSelectedCategory("")}
									className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
										!selectedCategory
											? "bg-primary text-primary-foreground"
											: "bg-secondary text-muted-foreground hover:text-foreground"
									}`}
								>
									All
								</button>
								{categories.map((cat) => (
									<button
										key={cat.id}
										onClick={() =>
											setSelectedCategory(
												selectedCategory === cat.slug ? "" : cat.slug,
											)
										}
										className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
											selectedCategory === cat.slug
												? "bg-primary text-primary-foreground"
												: "bg-secondary text-muted-foreground hover:text-foreground"
										}`}
									>
										{cat.name}
									</button>
								))}
							</div>

							<div className="flex items-center gap-3">
								{/* Rating filter */}
								<select
									value={minRating}
									onChange={(e) => setMinRating(Number(e.target.value))}
									className="border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
								>
									<option value={0}>Any rating</option>
									<option value={4}>4+ stars</option>
									<option value={4.5}>4.5+ stars</option>
									<option value={4.8}>4.8+ stars</option>
								</select>

								{/* Sort */}
								<select
									value={sort}
									onChange={(e) => setSort(e.target.value as SortOption)}
									className="border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
								>
									<option value="rating">Top Rated</option>
									<option value="price-low">Price: Low</option>
									<option value="price-high">Price: High</option>
									<option value="reviews">Most Reviews</option>
								</select>

								{/* Available only */}
								<label className="flex cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={availableOnly}
										onChange={(e) => setAvailableOnly(e.target.checked)}
										className="accent-primary"
									/>
									<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
										Available only
									</span>
								</label>
							</div>

							{hasActiveFilters && (
								<button
									onClick={clearFilters}
									className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
								>
									Clear all
								</button>
							)}
						</div>
					</div>

					{/* Results */}
					<div className="mt-6">
						<p className="mb-4 font-mono text-xs text-muted-foreground">
							{filteredAgents.length} agent
							{filteredAgents.length !== 1 ? "s" : ""} found
						</p>

						{filteredAgents.length > 0 ? (
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
								{filteredAgents.map((agent) => (
									<AgentCard key={agent.id} agent={agent} />
								))}
							</div>
						) : (
							<div className="flex flex-col items-center gap-4 py-20 text-center">
								<p className="text-sm text-muted-foreground">
									No agents match your filters.
								</p>
								<button
									onClick={clearFilters}
									className="font-mono text-xs uppercase tracking-wider text-primary transition-opacity hover:opacity-80"
								>
									Clear filters
								</button>
							</div>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
