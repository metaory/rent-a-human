import Image from "next/image";
import { StarRating } from "./star-rating";
import type { Review } from "@/lib/data";

interface ReviewCardProps {
	review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
	return (
		<div className="flex flex-col gap-3 border border-border bg-card p-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="relative h-8 w-8 shrink-0 overflow-hidden bg-secondary">
						<Image
							src={review.customerAvatar}
							alt={review.customerName}
							fill
							className="object-cover"
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-sm font-medium text-foreground">
							{review.customerName}
						</span>
						<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
							{review.createdAt}
						</span>
					</div>
				</div>
				<StarRating rating={review.rating} size={12} />
			</div>
			<p className="text-sm leading-relaxed text-muted-foreground">
				{review.comment}
			</p>
			<span className="self-start bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
				{review.category}
			</span>
		</div>
	);
}
