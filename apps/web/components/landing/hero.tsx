"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DarkVeil from "@/components/DarkVeil";
import TrueFocus from "@/components/TrueFocus";
import TextType from "@/components/TextType";

export function Hero() {
	const { agents, categories } = useStore();
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();

	const totalBookings = agents.reduce((acc, a) => acc + a.completedBookings, 0);

	function handleSearch(e: React.FormEvent) {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/agents?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	}

	return (
		<section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 py-24">
			<div className="pointer-events-none absolute inset-0 opacity-90">
				<DarkVeil
					speed={0.4}
					hueShift={120}
					tint={[0.45, 0.88, 0.55]}
					tintStrength={0.5}
				/>
			</div>
			{/* Grid overlay */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			<div className="relative z-10 flex max-w-3xl flex-col items-center gap-8 text-center">
				{/* Status line */}
				<div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
					<span className="h-2 w-2 bg-primary" />
					<TextType
						text="Human as a Service"
						as="span"
						className="tracking-widest"
						showCursor={true}
						cursorCharacter="█"
						typingSpeed={40}
						pauseDuration={12_000}
						loop={true}
					/>
				</div>

				{/* Headline */}
				<h1 className="text-balance font-mono text-5xl font-bold uppercase leading-none tracking-tight text-foreground md:text-7xl lg:text-8xl">
					<TrueFocus
						lines={["Rent a", "Human"]}
						className="block w-full"
						wordClassName="relative font-black cursor-pointer"
						lineClassName={["", "text-primary"]}
						borderColor="hsl(var(--primary))"
						glowColor="hsl(var(--primary) / 0.6)"
					/>
				</h1>

				<p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
					For whatever you need. Browse real humans, book by the hour, get
					things done. No algorithms, no AI -- just people.
				</p>

				{/* Search */}
				<form
					onSubmit={handleSearch}
					className="flex w-full max-w-md border border-border bg-card transition-colors focus-within:border-primary"
				>
					<div className="flex items-center px-3 text-muted-foreground">
						<Search className="h-4 w-4" />
					</div>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search agents, skills, categories..."
						className="flex-1 bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
					/>
					<button
						type="submit"
						className="cursor-target bg-primary px-4 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
					>
						Go
					</button>
				</form>

				{/* CTAs */}
				<div className="flex gap-3">
					<Link
						href="/agents"
						className="cursor-target flex items-center gap-2 bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
					>
						Browse Agents <ArrowRight className="h-3 w-3" />
					</Link>
					<Link
						href="/categories"
						className="cursor-target flex items-center gap-2 border border-border px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
					>
						View Categories
					</Link>
				</div>

				{/* Stats */}
				<div className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-muted-foreground md:gap-10">
					<div className="flex flex-col items-center gap-1">
						<span className="text-lg font-bold text-foreground md:text-2xl">
							{agents.length}
						</span>
						<span>Agents</span>
					</div>
					<div className="h-6 w-px bg-border" />
					<div className="flex flex-col items-center gap-1">
						<span className="text-lg font-bold text-foreground md:text-2xl">
							{categories.length}
						</span>
						<span>Categories</span>
					</div>
					<div className="h-6 w-px bg-border" />
					<div className="flex flex-col items-center gap-1">
						<span className="text-lg font-bold text-foreground md:text-2xl">
							{totalBookings.toLocaleString()}
						</span>
						<span>Completed</span>
					</div>
				</div>
			</div>
		</section>
	);
}
