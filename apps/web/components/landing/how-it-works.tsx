import { Search, CalendarCheck, Star } from "lucide-react";

const STEPS = [
	{
		number: "01",
		icon: Search,
		title: "Browse",
		description:
			"Search our roster of verified humans. Filter by category, rate, rating, and availability.",
	},
	{
		number: "02",
		icon: CalendarCheck,
		title: "Book",
		description:
			"Pick your agent, choose a time, and confirm your booking. Pay by the hour, no hidden fees.",
	},
	{
		number: "03",
		icon: Star,
		title: "Review",
		description:
			"After the job is done, leave a review to help others find the best agents for their needs.",
	},
];

export function HowItWorks() {
	return (
		<section className="border-y border-border bg-card">
			<div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
				<div className="text-center">
					<span className="font-mono text-xs uppercase tracking-widest text-primary">
						How It Works
					</span>
					<h2 className="mt-2 text-balance text-2xl font-bold text-foreground md:text-3xl">
						Three steps. That{"'"}s it.
					</h2>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
					{STEPS.map((step) => (
						<div
							key={step.number}
							className="flex flex-col items-center gap-4 text-center"
						>
							<span className="font-mono text-4xl font-bold text-primary/20">
								{step.number}
							</span>
							<div className="flex h-12 w-12 items-center justify-center border border-border bg-background">
								<step.icon className="h-5 w-5 text-primary" />
							</div>
							<h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
								{step.title}
							</h3>
							<p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
