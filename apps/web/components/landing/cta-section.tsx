import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
	return (
		<section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
			<div className="flex flex-col items-center gap-6 border border-primary/20 bg-card p-8 text-center md:p-16">
				<span className="font-mono text-xs uppercase tracking-widest text-primary">
					Join the Platform
				</span>
				<h2 className="max-w-lg text-balance text-2xl font-bold text-foreground md:text-4xl">
					Got skills? Get paid.
				</h2>
				<p className="max-w-md text-sm leading-relaxed text-muted-foreground">
					List yourself as an agent and start earning. Set your own rate, choose
					your categories, and build your reputation.
				</p>
				<Link
					href="/signup"
					className="cursor-target flex items-center gap-2 bg-primary px-8 py-3 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90"
				>
					Become an Agent <ArrowRight className="h-3 w-3" />
				</Link>
			</div>
		</section>
	);
}
