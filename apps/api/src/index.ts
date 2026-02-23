import { Hono } from "hono";
import { cors } from "hono/cors";

type Agent = {
	id: string;
	name: string;
	avatar: string;
	bio: string;
	hourlyRate: number;
	rating: number;
	reviewCount: number;
	location: string;
	verified: boolean;
	available: boolean;
	categories: string[];
	attributes: {
		strength: number;
		intelligence: number;
		charisma: number;
		endurance: number;
		creativity: number;
		reliability: number;
	};
	skillClass: "S" | "A" | "B" | "C";
	completedBookings: number;
	createdAt: string;
};

type Env = { AGENTS: KVNamespace };

const AGENTS_LIST_KEY = "agent:ids";

const avatar = (seed: string) =>
	`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`;

const defaultAgents: Agent[] = [
	{
		id: "agt-001",
		name: "Marcus Cole",
		avatar: avatar("Marcus Cole"),
		bio: "Former military, now freelance muscle and moving specialist.",
		hourlyRate: 45,
		rating: 4.9,
		reviewCount: 127,
		location: "Brooklyn, NY",
		verified: true,
		available: true,
		categories: ["Moving Help", "Furniture Assembly", "Event Security"],
		attributes: {
			strength: 9,
			intelligence: 6,
			charisma: 7,
			endurance: 10,
			creativity: 4,
			reliability: 9,
		},
		skillClass: "S",
		completedBookings: 312,
		createdAt: "2024-01-15",
	},
	{
		id: "agt-002",
		name: "Suki Tanaka",
		avatar: avatar("Suki Tanaka"),
		bio: "Professional line-stander and queue specialist.",
		hourlyRate: 30,
		rating: 4.7,
		reviewCount: 89,
		location: "Manhattan, NY",
		verified: true,
		available: true,
		categories: ["Queue Standing", "Errand Running", "Personal Shopping"],
		attributes: {
			strength: 4,
			intelligence: 7,
			charisma: 8,
			endurance: 10,
			creativity: 5,
			reliability: 10,
		},
		skillClass: "A",
		completedBookings: 203,
		createdAt: "2024-02-20",
	},
];

async function getAgentsList(kv: KVNamespace): Promise<Agent[]> {
	const raw = await kv.get(AGENTS_LIST_KEY);
	if (!raw) return [];
	const ids = JSON.parse(raw) as string[];
	const out: Agent[] = [];
	for (const id of ids) {
		const a = await kv.get(`agent:${id}`);
		if (a) out.push(JSON.parse(a) as Agent);
	}
	return out;
}

function agentFromBody(body: Record<string, unknown>, id: string): Agent {
	const now = new Date().toISOString().split("T")[0];
	const name = String(body.name ?? "").trim() || "Agent";
	return {
		id,
		name,
		avatar: avatar(name),
		bio: String(body.bio ?? ""),
		hourlyRate: Number(body.hourlyRate) || 0,
		rating: 0,
		reviewCount: 0,
		location: String(body.location ?? ""),
		verified: false,
		available: true,
		categories: Array.isArray(body.categories)
			? (body.categories as string[]).filter(Boolean)
			: [],
		attributes: {
			strength: 5,
			intelligence: 5,
			charisma: 5,
			endurance: 5,
			creativity: 5,
			reliability: 5,
		},
		skillClass: "B",
		completedBookings: 0,
		createdAt: now,
	};
}

const app = new Hono<{ Bindings: Env }>();

app.use(
	"*",
	cors({
		origin: [
			"http://localhost:3000",
			"http://127.0.0.1:3000",
			"https://metaory.github.io",
		],
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type"],
	}),
);

app.get("/", (c) => c.json({ ok: true, service: "rentahuman-api" }));

app.get("/agents", async (c) => {
	const kv = c.env.AGENTS;
	let list = await getAgentsList(kv);
	if (list.length === 0) {
		await kv.put(
			AGENTS_LIST_KEY,
			JSON.stringify(defaultAgents.map((a) => a.id)),
		);
		for (const a of defaultAgents) {
			await kv.put(`agent:${a.id}`, JSON.stringify(a));
		}
		list = defaultAgents;
	}
	return c.json(list);
});

app.get("/agents/:id", async (c) => {
	const id = c.req.param("id");
	const raw = await c.env.AGENTS.get(`agent:${id}`);
	if (!raw) return c.json({ error: "Not found" }, 404);
	return c.json(JSON.parse(raw) as Agent);
});

app.post("/agents", async (c) => {
	const body = (await c.req.json()) as Record<string, unknown>;
	const id = `agt-${Date.now().toString(36)}`;
	const agent = agentFromBody(body, id);
	const kv = c.env.AGENTS;
	const listRaw = await kv.get(AGENTS_LIST_KEY);
	const ids: string[] = listRaw ? JSON.parse(listRaw) : [];
	ids.push(id);
	await kv.put(AGENTS_LIST_KEY, JSON.stringify(ids));
	await kv.put(`agent:${id}`, JSON.stringify(agent));
	return c.json(agent, 201);
});

app.get("/categories", (c) =>
	c.json([
		{
			id: "cat-001",
			name: "Moving Help",
			slug: "moving-help",
			agentCount: 3,
			description: "Heavy lifting and relocation",
		},
		{
			id: "cat-002",
			name: "Companionship",
			slug: "companionship",
			agentCount: 3,
			description: "Social company for events",
		},
	]),
);

app.get("/bookings", (c) => c.json([]));
app.get("/reviews", (c) => c.json([]));
app.get("/reviews/agent/:id", (c) => c.json([]));

export default app;
