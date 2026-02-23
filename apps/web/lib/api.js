const API_URL =
	typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL
		? process.env.NEXT_PUBLIC_API_URL
		: "http://localhost:8787";

export async function getAgents() {
	const res = await fetch(`${API_URL}/agents`);
	if (!res.ok) return [];
	return res.json();
}

export async function getAgent(id) {
	const res = await fetch(`${API_URL}/agents/${id}`);
	if (!res.ok) return null;
	return res.json();
}

export async function postAgent(body) {
	const res = await fetch(`${API_URL}/agents`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) throw new Error(await res.text());
	return res.json();
}
