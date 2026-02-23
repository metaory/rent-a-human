"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/landing/hero";
import { FeaturedCategories } from "@/components/landing/featured-categories";
import { TopAgents } from "@/components/landing/top-agents";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CtaSection } from "@/components/landing/cta-section";

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Hero />
				<FeaturedCategories />
				<TopAgents />
				<HowItWorks />
				<CtaSection />
			</main>
			<Footer />
		</div>
	);
}
