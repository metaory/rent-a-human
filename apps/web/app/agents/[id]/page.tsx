import { notFound } from "next/navigation";
import { INITIAL_AGENTS, INITIAL_REVIEWS, getReviewsByAgent } from "@/lib/data";
import { AgentProfileClient } from "./agent-profile-client";

export function generateStaticParams() {
	return INITIAL_AGENTS.map((a) => ({ id: a.id }));
}

export default async function AgentProfilePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const agent = INITIAL_AGENTS.find((a) => a.id === id);
	if (!agent) return notFound();
	const agentReviews = getReviewsByAgent(INITIAL_REVIEWS, agent.id);
	return (
		<AgentProfileClient agent={agent} agentReviews={agentReviews} />
	);
}
