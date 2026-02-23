import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t border-border bg-background">
			<div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
				<div className="flex flex-col gap-10 md:flex-row md:justify-between">
					{/* Brand */}
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center bg-primary">
								<Zap className="h-4 w-4 text-primary-foreground" />
							</div>
							<span className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
								Rent a Human
							</span>
						</div>
						<p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
							Human as a Service. For whatever you need. The marketplace
							connecting people who need things done with people who do things.
						</p>
					</div>

					{/* Links */}
					<div className="flex gap-16">
						<div className="flex flex-col gap-3">
							<span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
								Platform
							</span>
							<Link
								href="/agents"
								className="text-sm text-muted-foreground transition-colors hover:text-primary"
							>
								Browse Agents
							</Link>
							<Link
								href="/categories"
								className="text-sm text-muted-foreground transition-colors hover:text-primary"
							>
								Categories
							</Link>
							<Link
								href="/bookings"
								className="text-sm text-muted-foreground transition-colors hover:text-primary"
							>
								Your Bookings
							</Link>
						</div>
						<div className="flex flex-col gap-3">
							<span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
								Company
							</span>
							<span className="text-sm text-muted-foreground">About</span>
							<span className="text-sm text-muted-foreground">Terms</span>
							<span className="text-sm text-muted-foreground">Privacy</span>
						</div>
					</div>
				</div>

				{/* Status bar */}
				<div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-xs text-muted-foreground md:flex-row md:items-center">
					<div className="flex items-center gap-6">
						<span className="flex items-center gap-2">
							<span className="h-2 w-2 bg-primary" />
							ONLINE: 668 AGENTS
						</span>
						<span>OPERATING SINCE: 2024</span>
					</div>
					<span>RENT A HUMAN INC.</span>
				</div>
			</div>
		</footer>
	);
}
