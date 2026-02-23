"use client";

import { useState, useMemo } from "react";
import { X, Check, Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Agent } from "@/lib/data";
import { toast } from "sonner";

interface BookingDialogProps {
	agent: Agent;
	open: boolean;
	onClose: () => void;
}

export function BookingDialog({ agent, open, onClose }: BookingDialogProps) {
	const { categories, addCategory, addBooking } = useStore();
	const [category, setCategory] = useState(agent.categories[0] || "");
	const [newCategory, setNewCategory] = useState("");
	const [showNewCategory, setShowNewCategory] = useState(false);
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("09:00");
	const [endTime, setEndTime] = useState("12:00");
	const [notes, setNotes] = useState("");
	const [booked, setBooked] = useState(false);

	const hours = useMemo(() => {
		const [sh, sm] = startTime.split(":").map(Number);
		const [eh, em] = endTime.split(":").map(Number);
		const diff = (eh * 60 + em - (sh * 60 + sm)) / 60;
		return Math.max(diff, 0);
	}, [startTime, endTime]);

	const totalCost = hours * agent.hourlyRate;

	function handleAddCategory() {
		if (newCategory.trim()) {
			addCategory(newCategory.trim());
			setCategory(newCategory.trim());
			setNewCategory("");
			setShowNewCategory(false);
		}
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!date || !category || hours <= 0) {
			toast.error("Please fill in all required fields");
			return;
		}
		addBooking({
			agentId: agent.id,
			agentName: agent.name,
			customerName: "You",
			category,
			date,
			startTime,
			endTime,
			hours,
			totalCost,
			status: "pending",
			notes,
		});
		setBooked(true);
		toast.success(`Booking confirmed with ${agent.name}`);
	}

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-background/80 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Dialog */}
			<div className="relative z-10 w-full max-w-md border border-border bg-card">
				{/* Header */}
				<div className="flex items-center justify-between border-b border-border p-4">
					<div>
						<h2 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
							{booked ? "Booking Confirmed" : "Book Agent"}
						</h2>
						<p className="mt-0.5 text-xs text-muted-foreground">
							{agent.name} - ${agent.hourlyRate}/hr
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

				{booked ? (
					<div className="flex flex-col items-center gap-4 p-8">
						<div className="flex h-16 w-16 items-center justify-center bg-primary">
							<Check className="h-8 w-8 text-primary-foreground" />
						</div>
						<div className="text-center">
							<p className="text-sm font-medium text-foreground">
								Your booking is pending confirmation.
							</p>
							<p className="mt-1 text-xs text-muted-foreground">
								{category} with {agent.name} on {date}
							</p>
							<p className="mt-2 font-mono text-lg font-bold text-primary">
								${totalCost.toFixed(2)}
							</p>
						</div>
						<button
							onClick={onClose}
							className="w-full bg-secondary py-2 font-mono text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary/80"
						>
							Close
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
						{/* Category */}
						<div className="flex flex-col gap-1.5">
							<label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								Category
							</label>
							{showNewCategory ? (
								<div className="flex gap-2">
									<input
										type="text"
										value={newCategory}
										onChange={(e) => setNewCategory(e.target.value)}
										placeholder="Type new category..."
										className="flex-1 border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
									/>
									<button
										type="button"
										onClick={handleAddCategory}
										className="bg-primary px-3 text-primary-foreground"
									>
										<Plus className="h-4 w-4" />
									</button>
									<button
										type="button"
										onClick={() => setShowNewCategory(false)}
										className="bg-secondary px-3 text-foreground"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							) : (
								<div className="flex gap-2">
									<select
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="flex-1 border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
									>
										{[
											...new Set([
												...agent.categories,
												...categories.map((c) => c.name),
											]),
										].map((cat) => (
											<option key={cat} value={cat}>
												{cat}
											</option>
										))}
									</select>
									<button
										type="button"
										onClick={() => setShowNewCategory(true)}
										className="bg-secondary px-3 text-xs font-mono uppercase tracking-wider text-foreground transition-colors hover:bg-secondary/80"
									>
										New
									</button>
								</div>
							)}
						</div>

						{/* Date */}
						<div className="flex flex-col gap-1.5">
							<label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								Date
							</label>
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								required
								className="border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
							/>
						</div>

						{/* Time */}
						<div className="flex gap-4">
							<div className="flex flex-1 flex-col gap-1.5">
								<label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
									Start
								</label>
								<input
									type="time"
									value={startTime}
									onChange={(e) => setStartTime(e.target.value)}
									className="border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
								/>
							</div>
							<div className="flex flex-1 flex-col gap-1.5">
								<label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
									End
								</label>
								<input
									type="time"
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
									className="border border-border bg-input px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
								/>
							</div>
						</div>

						{/* Notes */}
						<div className="flex flex-col gap-1.5">
							<label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
								Notes (optional)
							</label>
							<textarea
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								rows={2}
								placeholder="Any special requirements..."
								className="resize-none border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
							/>
						</div>

						{/* Cost summary */}
						<div className="flex items-center justify-between border-t border-border pt-4">
							<div className="text-xs text-muted-foreground">
								<span className="font-mono">{hours}</span> hours x{" "}
								<span className="font-mono">${agent.hourlyRate}</span>/hr
							</div>
							<span className="font-mono text-lg font-bold text-primary">
								${totalCost.toFixed(2)}
							</span>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-full bg-primary py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
						>
							Confirm Booking
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
