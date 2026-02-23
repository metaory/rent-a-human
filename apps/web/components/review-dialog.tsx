"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { StarRating } from "./star-rating";
import type { Booking } from "@/lib/data";
import { toast } from "sonner";

interface ReviewDialogProps {
	booking: Booking;
	open: boolean;
	onClose: () => void;
}

export function ReviewDialog({ booking, open, onClose }: ReviewDialogProps) {
	const { addReview } = useStore();
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");
	const [submitted, setSubmitted] = useState(false);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!comment.trim()) {
			toast.error("Please write a review");
			return;
		}
		addReview({
			agentId: booking.agentId,
			customerName: "You",
			customerAvatar: `https://api.dicebear.com/9.x/notionists/svg?seed=You`,
			rating,
			comment: comment.trim(),
			category: booking.category,
		});
		setSubmitted(true);
		toast.success("Review submitted!");
	}

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-background/80 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="relative z-10 w-full max-w-md border border-border bg-card">
				<div className="flex items-center justify-between border-b border-border p-4">
					<div>
						<h2 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
							{submitted ? "Review Submitted" : "Leave a Review"}
						</h2>
						<p className="mt-0.5 text-xs text-muted-foreground">
							{booking.agentName} - {booking.category}
						</p>
					</div>
					<button
						onClick={onClose}
						className="text-muted-foreground transition-colors hover:text-foreground"
						aria-label="Close"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				{submitted ? (
					<div className="flex flex-col items-center gap-4 p-8">
						<div className="flex h-16 w-16 items-center justify-center bg-primary">
							<Check className="h-8 w-8 text-primary-foreground" />
						</div>
						<p className="text-sm text-foreground">Thanks for your review!</p>
						<button
							onClick={onClose}
							className="w-full bg-secondary py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary/80"
						>
							Close
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
						<div className="flex flex-col items-center gap-2">
							<label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								Your Rating
							</label>
							<StarRating
								rating={rating}
								size={28}
								interactive
								onRate={setRating}
							/>
						</div>
						<div className="flex flex-col gap-1.5">
							<label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								Your Review
							</label>
							<textarea
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								rows={4}
								required
								placeholder="How was your experience?"
								className="resize-none border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-primary py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
						>
							Submit Review
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
