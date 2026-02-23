import { INITIAL_AGENTS } from "@/lib/data";
import { AgentProfileById } from "../agent-profile-by-id";

export function generateStaticParams() {
	return INITIAL_AGENTS.slice(0, 2).map((a) => ({ id: a.id }));
}

export default async function AgentIdPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return <AgentProfileById id={id} />;
}
