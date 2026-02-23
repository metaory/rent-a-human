import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
	"*",
	cors({
		origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type"],
	}),
);

const avatar = (seed: string) =>
	`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`;

const agents = [
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

const categories = [
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
];

const bookings: Array<{
	id: string;
	agentId: string;
	agentName: string;
	customerName: string;
	category: string;
	date: string;
	startTime: string;
	endTime: string;
	hours: number;
	totalCost: number;
	status: string;
	notes: string;
	createdAt: string;
}> = [];

const reviews: Array<{
	id: string;
	agentId: string;
	customerName: string;
	customerAvatar: string;
	rating: number;
	comment: string;
	category: string;
	createdAt: string;
}> = [];

const genId = (prefix: string) => `${prefix}-${Date.now().toString(36)}`;

app.get("/", (c) => c.json({ ok: true, service: "rentahuman-api" }));

app.get("/agents", (c) => c.json(agents));
app.get("/agents/:id", (c) => {
	const agent = agents.find((a) => a.id === c.req.param("id"));
	return agent ? c.json(agent) : c.json({ error: "Not found" }, 404);
});

app.get("/categories", (c) => c.json(categories));

app.get("/bookings", (c) => c.json(bookings));
app.post("/bookings", async (c) => {
	const body = await c.req.json<Record<string, unknown>>();
	const agent = agents.find((a) => a.id === body.agentId);
	const booking = {
		id: genId("bk"),
		agentId: String(body.agentId ?? ""),
		agentName: agent?.name ?? "",
		customerName: String(body.customerName ?? "You"),
		category: String(body.category ?? ""),
		date: String(body.date ?? ""),
		startTime: String(body.startTime ?? ""),
		endTime: String(body.endTime ?? ""),
		hours: Number(body.hours ?? 0),
		totalCost: Number(body.totalCost ?? 0),
		status: "pending",
		notes: String(body.notes ?? ""),
		createdAt: new Date().toISOString().split("T")[0],
	};
	bookings.push(booking);
	return c.json(booking, 201);
});

app.get("/reviews", (c) => c.json(reviews));
app.get("/reviews/agent/:id", (c) =>
	c.json(reviews.filter((r) => r.agentId === c.req.param("id"))),
);
app.post("/reviews", async (c) => {
	const body = await c.req.json<Record<string, unknown>>();
	const review = {
		id: genId("rev"),
		agentId: String(body.agentId ?? ""),
		customerName: String(body.customerName ?? "You"),
		customerAvatar: avatar("You"),
		rating: Number(body.rating ?? 5),
		comment: String(body.comment ?? ""),
		category: String(body.category ?? ""),
		createdAt: new Date().toISOString().split("T")[0],
	};
	reviews.push(review);
	return c.json(review, 201);
});

export default app;
