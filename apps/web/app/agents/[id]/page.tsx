"use client";

import { use, useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StarRating } from "@/components/star-rating";
import { AttributeBar } from "@/components/attribute-bar";
import { ReviewCard } from "@/components/review-card";
import { BookingDialog } from "@/components/booking-dialog";
import { useStore } from "@/lib/store";
import { getReviewsByAgent, INITIAL_AGENTS } from "@/lib/data";

export function generateStaticParams() {
	return INITIAL_AGENTS.map((a) => ({ id: a.id }));
}
import {
	ShieldCheck,
	MapPin,
	Calendar,
	Briefcase,
	ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "about" | "attributes" | "reviews";

export default function AgentProfilePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const { agents, reviews } = useStore();
	const [activeTab, setActiveTab] = useState<Tab>("about");
	const [bookingOpen, setBookingOpen] = useState(false);

	const agent = agents.find((a) => a.id === id);
	const agentReviews = useMemo(
		() => (agent ? getReviewsByAgent(reviews, agent.id) : []),
		[agent, reviews],
	);

	if (!agent) return notFound();

	const TABS: { id: Tab; label: string }[] = [
		{ id: "about", label: "About" },
		{ id: "attributes", label: "Attributes" },
		{ id: "reviews", label: `Reviews (${agentReviews.length})` },
	];

	const ATTRIBUTE_LABELS: Record<string, string> = {
		strength: "Strength",
		intelligence: "Intelligence",
		charisma: "Charisma",
		endurance: "Endurance",
		creativity: "Creativity",
		reliability: "Reliability",
	};

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
					{/* Back link */}
					<Link
						href="/agents"
						className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
					>
						<ArrowLeft className="h-3 w-3" /> Back to agents
					</Link>

					<div className="flex flex-col gap-8 lg:flex-row">
						{/* Main content */}
						<div className="flex-1">
							{/* Hero */}
							<div className="flex flex-col gap-6 sm:flex-row">
								<div className="relative h-40 w-40 shrink-0 overflow-hidden bg-secondary sm:h-48 sm:w-48">
									<Image
										src={agent.avatar}
										alt={agent.name}
										fill
										className="object-cover"
									/>
									<div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center bg-background/80 backdrop-blur-sm">
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

								<div className="flex flex-col gap-3">
									<div className="flex items-center gap-2">
										<h1 className="text-2xl font-bold text-foreground">
											{agent.name}
										</h1>
										{agent.verified && (
											<ShieldCheck className="h-5 w-5 text-primary" />
										)}
									</div>

									<div className="flex items-center gap-2">
										<StarRating rating={agent.rating} size={14} />
										<span className="font-mono text-xs text-muted-foreground">
											{agent.rating} ({agent.reviewCount} reviews)
										</span>
									</div>

									<div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
										<span className="flex items-center gap-1">
											<MapPin className="h-3 w-3" /> {agent.location}
										</span>
										<span className="flex items-center gap-1">
											<Calendar className="h-3 w-3" /> Since {agent.createdAt}
										</span>
										<span className="flex items-center gap-1">
											<Briefcase className="h-3 w-3" />{" "}
											{agent.completedBookings} bookings
										</span>
									</div>

									<div className="flex flex-wrap gap-1.5">
										{agent.categories.map((cat) => (
											<Link
												key={cat}
												href={`/agents?category=${cat.toLowerCase().replace(/\s+/g, "-")}`}
												className="bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
											>
												{cat}
											</Link>
										))}
									</div>

									<div className="flex items-center gap-2">
										<span
											className={cn(
												"h-2 w-2 rounded-full",
												agent.available ? "bg-primary" : "bg-muted-foreground",
											)}
										/>
										<span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
											{agent.available ? "Available now" : "Currently busy"}
										</span>
									</div>
								</div>
							</div>

							{/* Tabs */}
							<div className="mt-8 flex gap-0 border-b border-border">
								{TABS.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={cn(
											"px-4 py-3 font-mono text-xs uppercase tracking-wider transition-colors",
											activeTab === tab.id
												? "border-b-2 border-primary text-primary"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										{tab.label}
									</button>
								))}
							</div>

							{/* Tab content */}
							<div className="mt-6">
								{activeTab === "about" && (
									<div className="flex flex-col gap-4">
										<h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
											Bio
										</h3>
										<p className="text-sm leading-relaxed text-muted-foreground">
											{agent.bio}
										</p>

										<h3 className="mt-4 font-mono text-xs font-bold uppercase tracking-wider text-foreground">
											Key Stats
										</h3>
										<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
											{[
												{ label: "Rate", value: `$${agent.hourlyRate}/hr` },
												{ label: "Rating", value: agent.rating.toString() },
												{
													label: "Reviews",
													value: agent.reviewCount.toString(),
												},
												{
													label: "Bookings",
													value: agent.completedBookings.toString(),
												},
											].map((stat) => (
												<div
													key={stat.label}
													className="border border-border bg-card p-3"
												>
													<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
														{stat.label}
													</span>
													<p className="mt-1 font-mono text-lg font-bold text-foreground">
														{stat.value}
													</p>
												</div>
											))}
										</div>
									</div>
								)}

								{activeTab === "attributes" && (
									<div className="flex flex-col gap-6">
										<div>
											<h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
												Attributes
											</h3>
											<div className="mt-4 flex flex-col gap-3">
												{Object.entries(agent.attributes).map(
													([key, value]) => (
														<AttributeBar
															key={key}
															label={ATTRIBUTE_LABELS[key] || key}
															value={value}
														/>
													),
												)}
											</div>
										</div>

										<div>
											<h3 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
												Skill Class
											</h3>
											<div className="mt-4 flex items-center gap-4">
												{(["S", "A", "B", "C"] as const).map((cls) => (
													<div
														key={cls}
														className={cn(
															"flex h-12 w-12 items-center justify-center border font-mono text-lg font-bold",
															agent.skillClass === cls
																? "border-primary bg-primary/10 text-primary"
																: "border-border text-muted-foreground/30",
														)}
													>
														{cls}
													</div>
												))}
											</div>
											<p className="mt-3 text-xs text-muted-foreground">
												{agent.name} is classified as{" "}
												<span className="font-mono font-bold text-primary">
													{agent.skillClass}-class
												</span>
												{agent.skillClass === "S"
													? " -- the highest tier, reserved for exceptional agents."
													: agent.skillClass === "A"
														? " -- a top-performing agent with outstanding skills."
														: agent.skillClass === "B"
															? " -- a solid performer with reliable skills."
															: " -- a rising agent building their reputation."}
											</p>
										</div>
									</div>
								)}

								{activeTab === "reviews" && (
									<div className="flex flex-col gap-4">
										{agentReviews.length > 0 ? (
											agentReviews.map((review) => (
												<ReviewCard key={review.id} review={review} />
											))
										) : (
											<p className="py-10 text-center text-sm text-muted-foreground">
												No reviews yet.
											</p>
										)}
									</div>
								)}
							</div>
						</div>

						{/* Sidebar */}
						<aside className="hidden w-72 shrink-0 lg:block">
							<div className="sticky top-20 border border-border bg-card p-6">
								<div className="flex flex-col gap-4">
									<div>
										<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
											Hourly Rate
										</span>
										<p className="font-mono text-3xl font-bold text-primary">
											${agent.hourlyRate}
											<span className="text-sm text-muted-foreground">/hr</span>
										</p>
									</div>
									<button
										onClick={() => setBookingOpen(true)}
										disabled={!agent.available}
										className={cn(
											"w-full py-3 font-mono text-xs font-bold uppercase tracking-wider transition-opacity",
											agent.available
												? "bg-primary text-primary-foreground hover:opacity-90"
												: "cursor-not-allowed bg-secondary text-muted-foreground",
										)}
									>
										{agent.available
											? "Book This Agent"
											: "Currently Unavailable"}
									</button>
									<p className="text-center text-[10px] text-muted-foreground">
										{"You won't be charged yet"}
									</p>
								</div>
							</div>
						</aside>
					</div>
				</div>

				{/* Mobile booking bar */}
				<div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-border bg-background px-4 py-3 lg:hidden">
					<div>
						<span className="font-mono text-xl font-bold text-primary">
							${agent.hourlyRate}
						</span>
						<span className="text-xs text-muted-foreground">/hr</span>
					</div>
					<button
						onClick={() => setBookingOpen(true)}
						disabled={!agent.available}
						className={cn(
							"px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider",
							agent.available
								? "bg-primary text-primary-foreground"
								: "cursor-not-allowed bg-secondary text-muted-foreground",
						)}
					>
						{agent.available ? "Book Now" : "Unavailable"}
					</button>
				</div>
			</main>
			<Footer />

			<BookingDialog
				agent={agent}
				open={bookingOpen}
				onClose={() => setBookingOpen(false)}
			/>
		</div>
	);
}
