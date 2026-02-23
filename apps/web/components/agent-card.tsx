import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./star-rating";
import type { Agent } from "@/lib/data";

interface AgentCardProps {
	agent: Agent;
	className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
	return (
		<Link
			href={`/agents/${agent.id}`}
			className={cn(
				"group flex flex-col border border-border bg-card transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(163,230,53,0.05)]",
				className,
			)}
		>
			{/* Avatar */}
			<div className="relative aspect-square w-full overflow-hidden bg-secondary">
				<Image
					src={agent.avatar}
					alt={agent.name}
					fill
					className="object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				{/* Availability dot */}
				<div className="absolute right-3 top-3 flex items-center gap-1.5 bg-background/80 px-2 py-1 backdrop-blur-sm">
					<span
						className={cn(
							"h-2 w-2 rounded-full",
							agent.available ? "bg-primary" : "bg-muted-foreground",
						)}
					/>
					<span className="font-mono text-[10px] uppercase tracking-wider text-foreground">
						{agent.available ? "Available" : "Busy"}
					</span>
				</div>
				{/* Skill class badge */}
				<div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center bg-background/80 backdrop-blur-sm">
					<span
						className={cn(
							"font-mono text-sm font-bold",
							agent.skillClass === "S"
								? "text-primary"
								: agent.skillClass === "A"
									? "text-foreground"
									: "text-muted-foreground",
						)}
					>
						{agent.skillClass}
					</span>
				</div>
			</div>

			{/* Info */}
			<div className="flex flex-1 flex-col gap-2 p-4">
				<div className="flex items-start justify-between gap-2">
					<div className="flex items-center gap-1.5">
						<h3 className="text-sm font-semibold text-foreground">
							{agent.name}
						</h3>
						{agent.verified && (
							<ShieldCheck className="h-3.5 w-3.5 text-primary" />
						)}
					</div>
					<span className="shrink-0 font-mono text-sm font-bold text-primary">
						${agent.hourlyRate}
						<span className="text-[10px] text-muted-foreground">/hr</span>
					</span>
				</div>

				{/* Categories */}
				<div className="flex flex-wrap gap-1.5">
					{agent.categories.slice(0, 2).map((cat) => (
						<span
							key={cat}
							className="bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
						>
							{cat}
						</span>
					))}
					{agent.categories.length > 2 && (
						<span className="bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
							+{agent.categories.length - 2}
						</span>
					)}
				</div>

				{/* Rating */}
				<div className="mt-auto flex items-center gap-2 pt-2">
					<StarRating rating={agent.rating} size={12} />
					<span className="font-mono text-xs text-muted-foreground">
						{agent.rating} ({agent.reviewCount})
					</span>
				</div>
			</div>
		</Link>
	);
}
