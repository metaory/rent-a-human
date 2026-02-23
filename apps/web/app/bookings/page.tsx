"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReviewDialog } from "@/components/review-dialog";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Booking } from "@/lib/data";
import { Calendar, Clock, DollarSign } from "lucide-react";

const STATUS_STYLES: Record<Booking["status"], string> = {
	pending: "bg-warning/10 text-warning",
	confirmed: "bg-primary/10 text-primary",
	completed: "bg-primary/20 text-primary",
	cancelled: "bg-destructive/10 text-destructive",
};

export default function BookingsPage() {
	const { bookings } = useStore();
	const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);

	const sorted = [...bookings].sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
					<div>
						<span className="font-mono text-xs uppercase tracking-widest text-primary">
							Your Activity
						</span>
						<h1 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">
							Bookings
						</h1>
					</div>

					{sorted.length > 0 ? (
						<div className="mt-8 flex flex-col gap-3">
							{sorted.map((booking) => (
								<div
									key={booking.id}
									className="flex flex-col gap-4 border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
								>
									<div className="flex flex-col gap-2">
										<div className="flex items-center gap-3">
											<Link
												href={`/agents/profile?id=${booking.agentId}`}
												className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
											>
												{booking.agentName}
											</Link>
											<span
												className={cn(
													"px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
													STATUS_STYLES[booking.status],
												)}
											>
												{booking.status}
											</span>
										</div>

										<div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
											<span className="flex items-center gap-1">
												<Calendar className="h-3 w-3" /> {booking.date}
											</span>
											<span className="flex items-center gap-1">
												<Clock className="h-3 w-3" /> {booking.startTime} -{" "}
												{booking.endTime} ({booking.hours}h)
											</span>
											<span className="flex items-center gap-1">
												<DollarSign className="h-3 w-3" /> ${booking.totalCost}
											</span>
										</div>

										<div className="flex items-center gap-2">
											<span className="bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
												{booking.category}
											</span>
											{booking.notes && (
												<span className="text-xs text-muted-foreground">
													{booking.notes}
												</span>
											)}
										</div>
									</div>

									<div className="flex shrink-0 gap-2">
										{booking.status === "completed" && (
											<button
												type="button"
												onClick={() => setReviewBooking(booking)}
												className="bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
											>
												Leave Review
											</button>
										)}
										<Link
											href={`/agents/profile?id=${booking.agentId}`}
											className="border border-border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
										>
											View Agent
										</Link>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center gap-4 py-20 text-center">
							<p className="text-sm text-muted-foreground">No bookings yet.</p>
							<Link
								href="/agents"
								className="font-mono text-xs uppercase tracking-wider text-primary transition-opacity hover:opacity-80"
							>
								Browse agents
							</Link>
						</div>
					)}
				</div>
			</main>
			<Footer />

			{reviewBooking && (
				<ReviewDialog
					booking={reviewBooking}
					open={!!reviewBooking}
					onClose={() => setReviewBooking(null)}
				/>
			)}
		</div>
	);
}
