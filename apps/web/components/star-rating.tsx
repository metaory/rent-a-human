"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
	rating: number;
	max?: number;
	size?: number;
	interactive?: boolean;
	onRate?: (value: number) => void;
	className?: string;
}

export function StarRating({
	rating,
	max = 5,
	size = 16,
	interactive = false,
	onRate,
	className,
}: StarRatingProps) {
	return (
		<div
			className={cn("flex items-center gap-0.5", className)}
			role={interactive ? "radiogroup" : "img"}
			aria-label={`${rating} out of ${max} stars`}
		>
			{Array.from({ length: max }, (_, i) => {
				const filled = i < Math.floor(rating);
				const partial = !filled && i < rating;
				return (
					<button
						key={i}
						type="button"
						disabled={!interactive}
						onClick={() => onRate?.(i + 1)}
						className={cn(
							"relative p-0",
							interactive
								? "cursor-pointer transition-transform hover:scale-110"
								: "cursor-default",
						)}
						aria-label={
							interactive ? `Rate ${i + 1} star${i > 0 ? "s" : ""}` : undefined
						}
					>
						<Star
							size={size}
							className={cn(
								"transition-colors",
								filled
									? "fill-primary text-primary"
									: partial
										? "fill-primary/50 text-primary/50"
										: "fill-none text-muted-foreground/40",
							)}
						/>
					</button>
				);
			})}
		</div>
	);
}
