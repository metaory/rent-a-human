"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
	{ href: "/agents", label: "Browse" },
	{ href: "/categories", label: "Categories" },
	{ href: "/bookings", label: "Bookings" },
];

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
			<nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center bg-primary">
						<Zap className="h-4 w-4 text-primary-foreground" />
					</div>
					<span className="font-mono text-sm font-bold uppercase tracking-widest text-foreground">
						Rent a Human
					</span>
				</Link>

				{/* Desktop Nav */}
				<div className="hidden items-center gap-8 md:flex">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Desktop CTA */}
				<Link
					href="/agents"
					className="hidden bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 md:inline-block"
				>
					List Yourself
				</Link>

				{/* Mobile toggle */}
				<button
					onClick={() => setMobileOpen(!mobileOpen)}
					className="flex h-8 w-8 items-center justify-center text-foreground md:hidden"
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
				>
					{mobileOpen ? (
						<X className="h-5 w-5" />
					) : (
						<Menu className="h-5 w-5" />
					)}
				</button>
			</nav>

			{/* Mobile menu */}
			{mobileOpen && (
				<div className="border-t border-border bg-background px-4 pb-4 md:hidden">
					<div className="flex flex-col gap-3 pt-3">
						{NAV_LINKS.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setMobileOpen(false)}
								className="font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
							>
								{link.label}
							</Link>
						))}
						<Link
							href="/agents"
							onClick={() => setMobileOpen(false)}
							className="mt-2 bg-primary px-4 py-2 text-center font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground"
						>
							List Yourself
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
