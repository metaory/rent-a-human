"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postAgent } from "@/lib/api";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [form, setForm] = useState({
		name: "",
		bio: "",
		hourlyRate: "",
		location: "",
		categories: "",
	});

	const update = (key: keyof typeof form, value: string) =>
		setForm((prev) => ({ ...prev, [key]: value }));

	async function submit(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		const body = {
			name: form.name.trim(),
			bio: form.bio.trim(),
			hourlyRate: Number(form.hourlyRate) || 0,
			location: form.location.trim(),
			categories: form.categories
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
		};
		postAgent(body)
			.then((agent) => {
				router.push(`/agents?new=${agent.id}`);
			})
			.catch((err) => {
				setError(err?.message || "Signup failed");
				setLoading(false);
			});
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 px-4 py-8 lg:px-8">
				<div className="mx-auto max-w-md">
					<Link
						href="/agents"
						className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
					>
						<ArrowLeft className="h-3 w-3" /> Back to agents
					</Link>
					<h1 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground">
						Become an agent
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						List yourself and start earning.
					</p>
					<form onSubmit={submit} className="mt-6 flex flex-col gap-4">
						<div>
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={form.name}
								onChange={(e) => update("name", e.target.value)}
								placeholder="Your name"
								required
								className="mt-1"
							/>
						</div>
						<div>
							<Label htmlFor="bio">Bio</Label>
							<Input
								id="bio"
								value={form.bio}
								onChange={(e) => update("bio", e.target.value)}
								placeholder="Short description of what you offer"
								className="mt-1"
							/>
						</div>
						<div>
							<Label htmlFor="hourlyRate">Hourly rate ($)</Label>
							<Input
								id="hourlyRate"
								type="number"
								min="0"
								value={form.hourlyRate}
								onChange={(e) => update("hourlyRate", e.target.value)}
								placeholder="0"
								className="mt-1"
							/>
						</div>
						<div>
							<Label htmlFor="location">Location</Label>
							<Input
								id="location"
								value={form.location}
								onChange={(e) => update("location", e.target.value)}
								placeholder="City, State"
								className="mt-1"
							/>
						</div>
						<div>
							<Label htmlFor="categories">Categories (comma-separated)</Label>
							<Input
								id="categories"
								value={form.categories}
								onChange={(e) => update("categories", e.target.value)}
								placeholder="Moving Help, Errand Running"
								className="mt-1"
							/>
						</div>
						{error && (
							<p className="text-sm text-destructive">{error}</p>
						)}
						<button
							type="submit"
							disabled={loading}
							className="mt-2 bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
						>
							{loading ? "Submitting…" : "List myself"}
						</button>
					</form>
				</div>
			</main>
			<Footer />
		</div>
	);
}
