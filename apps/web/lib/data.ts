// Types
export interface Agent {
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
}

export interface Category {
	id: string;
	name: string;
	slug: string;
	agentCount: number;
	description: string;
}

export interface Booking {
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
	status: "pending" | "confirmed" | "completed" | "cancelled";
	notes: string;
	createdAt: string;
}

export interface Review {
	id: string;
	agentId: string;
	customerName: string;
	customerAvatar: string;
	rating: number;
	comment: string;
	category: string;
	createdAt: string;
}

// Helper to generate dicebear avatars
function avatar(seed: string) {
	return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}`;
}

// Mock Agents
export const INITIAL_AGENTS: Agent[] = [
	{
		id: "agt-001",
		name: "Marcus Cole",
		avatar: avatar("Marcus Cole"),
		bio: "Former military, now freelance muscle and moving specialist. I carry things so you don't have to. Also excellent at assembling IKEA furniture under pressure.",
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
		bio: "Professional line-stander and queue specialist. I've waited in line at Supreme drops, DMV offices, and hospital ERs. Patience is literally my job.",
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
	{
		id: "agt-003",
		name: "Devon Wright",
		avatar: avatar("Devon Wright"),
		bio: "Your professional plus-one for any occasion. Weddings, galas, family dinners where your parents ask why you're still single. I adapt to any social situation.",
		hourlyRate: 65,
		rating: 4.8,
		reviewCount: 156,
		location: "Los Angeles, CA",
		verified: true,
		available: true,
		categories: ["Event Plus-One", "Companionship", "Social Coaching"],
		attributes: {
			strength: 5,
			intelligence: 8,
			charisma: 10,
			endurance: 6,
			creativity: 8,
			reliability: 8,
		},
		skillClass: "S",
		completedBookings: 278,
		createdAt: "2024-01-03",
	},
	{
		id: "agt-004",
		name: "Priya Sharma",
		avatar: avatar("Priya Sharma"),
		bio: "Full-stack human. I debug your code, fix your wifi, set up your smart home, and explain to your parents why the printer isn't working. Again.",
		hourlyRate: 55,
		rating: 4.9,
		reviewCount: 201,
		location: "San Francisco, CA",
		verified: true,
		available: true,
		categories: ["Tech Support", "Smart Home Setup", "Tutoring"],
		attributes: {
			strength: 3,
			intelligence: 10,
			charisma: 6,
			endurance: 7,
			creativity: 9,
			reliability: 9,
		},
		skillClass: "S",
		completedBookings: 445,
		createdAt: "2023-11-10",
	},
	{
		id: "agt-005",
		name: "Jamal Henderson",
		avatar: avatar("Jamal Henderson"),
		bio: "Dog whisperer, cat negotiator, hamster therapist. 8 years of professional pet care. Your animals will love me more than they love you.",
		hourlyRate: 35,
		rating: 4.6,
		reviewCount: 72,
		location: "Austin, TX",
		verified: true,
		available: false,
		categories: ["Pet Sitting", "Dog Walking", "Pet Training"],
		attributes: {
			strength: 6,
			intelligence: 7,
			charisma: 9,
			endurance: 8,
			creativity: 7,
			reliability: 8,
		},
		skillClass: "A",
		completedBookings: 189,
		createdAt: "2024-03-01",
	},
	{
		id: "agt-006",
		name: "Elena Volkov",
		avatar: avatar("Elena Volkov"),
		bio: "Personal shopper with an eye for deals and an instinct for style. I'll find you the perfect outfit or furnish your apartment without breaking the bank.",
		hourlyRate: 50,
		rating: 4.8,
		reviewCount: 134,
		location: "Chicago, IL",
		verified: true,
		available: true,
		categories: [
			"Personal Shopping",
			"Interior Styling",
			"Wardrobe Consulting",
		],
		attributes: {
			strength: 3,
			intelligence: 8,
			charisma: 9,
			endurance: 5,
			creativity: 10,
			reliability: 7,
		},
		skillClass: "A",
		completedBookings: 267,
		createdAt: "2024-01-22",
	},
	{
		id: "agt-007",
		name: "Tommy Park",
		avatar: avatar("Tommy Park"),
		bio: "Professional furniture assembler and handyman. I've built over 2,000 pieces of IKEA furniture and only had 3 leftover screws. Total.",
		hourlyRate: 40,
		rating: 4.5,
		reviewCount: 98,
		location: "Seattle, WA",
		verified: false,
		available: true,
		categories: ["Furniture Assembly", "Handyman", "Moving Help"],
		attributes: {
			strength: 8,
			intelligence: 7,
			charisma: 5,
			endurance: 8,
			creativity: 6,
			reliability: 9,
		},
		skillClass: "B",
		completedBookings: 156,
		createdAt: "2024-04-10",
	},
	{
		id: "agt-008",
		name: "Ava Simmons",
		avatar: avatar("Ava Simmons"),
		bio: "Certified life coach and professional listener. I'll attend your family gatherings and deflect awkward questions. Also available for moral support during adulting.",
		hourlyRate: 60,
		rating: 4.7,
		reviewCount: 112,
		location: "Miami, FL",
		verified: true,
		available: true,
		categories: ["Companionship", "Life Coaching", "Social Coaching"],
		attributes: {
			strength: 4,
			intelligence: 9,
			charisma: 10,
			endurance: 6,
			creativity: 8,
			reliability: 7,
		},
		skillClass: "A",
		completedBookings: 198,
		createdAt: "2024-02-14",
	},
	{
		id: "agt-009",
		name: "Riku Watanabe",
		avatar: avatar("Riku Watanabe"),
		bio: "Errand runner extraordinaire. Groceries, pharmacy, post office, dry cleaning - I handle the boring stuff so you can pretend you're productive.",
		hourlyRate: 25,
		rating: 4.4,
		reviewCount: 64,
		location: "Portland, OR",
		verified: false,
		available: true,
		categories: ["Errand Running", "Grocery Shopping", "Queue Standing"],
		attributes: {
			strength: 6,
			intelligence: 6,
			charisma: 6,
			endurance: 9,
			creativity: 4,
			reliability: 8,
		},
		skillClass: "B",
		completedBookings: 142,
		createdAt: "2024-05-01",
	},
	{
		id: "agt-010",
		name: "Zara Okonkwo",
		avatar: avatar("Zara Okonkwo"),
		bio: "Event planner and party enhancer. I'll organize your birthday, hype up your karaoke night, or be the fun friend at your boring corporate event.",
		hourlyRate: 55,
		rating: 4.9,
		reviewCount: 178,
		location: "Atlanta, GA",
		verified: true,
		available: true,
		categories: ["Event Plus-One", "Event Planning", "Companionship"],
		attributes: {
			strength: 5,
			intelligence: 8,
			charisma: 10,
			endurance: 7,
			creativity: 10,
			reliability: 8,
		},
		skillClass: "S",
		completedBookings: 334,
		createdAt: "2023-12-05",
	},
	{
		id: "agt-011",
		name: "Leo Brandt",
		avatar: avatar("Leo Brandt"),
		bio: "Your personal fitness buddy and outdoor adventure partner. I'll spot you at the gym, pace your 5K, or pretend to enjoy hiking as much as you do.",
		hourlyRate: 40,
		rating: 4.6,
		reviewCount: 87,
		location: "Denver, CO",
		verified: true,
		available: true,
		categories: ["Fitness Buddy", "Outdoor Adventures", "Moving Help"],
		attributes: {
			strength: 9,
			intelligence: 5,
			charisma: 7,
			endurance: 10,
			creativity: 4,
			reliability: 7,
		},
		skillClass: "A",
		completedBookings: 201,
		createdAt: "2024-03-18",
	},
	{
		id: "agt-012",
		name: "Nina Chen",
		avatar: avatar("Nina Chen"),
		bio: "Professional organizer and declutter specialist. I'll Marie Kondo your closet, optimize your kitchen, and silently judge your hoarding tendencies.",
		hourlyRate: 45,
		rating: 4.8,
		reviewCount: 143,
		location: "San Diego, CA",
		verified: true,
		available: true,
		categories: ["Home Organization", "Personal Shopping", "Interior Styling"],
		attributes: {
			strength: 4,
			intelligence: 9,
			charisma: 7,
			endurance: 6,
			creativity: 10,
			reliability: 10,
		},
		skillClass: "A",
		completedBookings: 289,
		createdAt: "2024-01-30",
	},
];

// Mock Categories
export const INITIAL_CATEGORIES: Category[] = [
	{
		id: "cat-001",
		name: "Moving Help",
		slug: "moving-help",
		agentCount: 3,
		description: "Heavy lifting, packing, and relocation assistance",
	},
	{
		id: "cat-002",
		name: "Companionship",
		slug: "companionship",
		agentCount: 3,
		description: "Social company for events, outings, or just hanging out",
	},
	{
		id: "cat-003",
		name: "Queue Standing",
		slug: "queue-standing",
		agentCount: 2,
		description: "Professional line-waiting for drops, offices, and more",
	},
	{
		id: "cat-004",
		name: "Event Plus-One",
		slug: "event-plus-one",
		agentCount: 2,
		description: "A charming date for weddings, galas, and parties",
	},
	{
		id: "cat-005",
		name: "Tech Support",
		slug: "tech-support",
		agentCount: 1,
		description: "Debug, setup, and fix your digital life",
	},
	{
		id: "cat-006",
		name: "Pet Sitting",
		slug: "pet-sitting",
		agentCount: 1,
		description: "Loving care for your furry, scaly, or feathery friends",
	},
	{
		id: "cat-007",
		name: "Furniture Assembly",
		slug: "furniture-assembly",
		agentCount: 2,
		description: "IKEA nightmares solved. Allen wrenches included.",
	},
	{
		id: "cat-008",
		name: "Personal Shopping",
		slug: "personal-shopping",
		agentCount: 3,
		description: "Style guidance and deal-hunting for any budget",
	},
];

// Mock Reviews
export const INITIAL_REVIEWS: Review[] = [
	{
		id: "rev-001",
		agentId: "agt-001",
		customerName: "Alex Turner",
		customerAvatar: avatar("Alex Turner"),
		rating: 5,
		comment:
			"Marcus moved my entire apartment in 3 hours. The man is a machine. Worth every penny.",
		category: "Moving Help",
		createdAt: "2025-12-10",
	},
	{
		id: "rev-002",
		agentId: "agt-001",
		customerName: "Mia Wallace",
		customerAvatar: avatar("Mia Wallace"),
		rating: 5,
		comment:
			"Assembled my standing desk, bookshelf, and bed frame without breaking a sweat. Left zero extra screws.",
		category: "Furniture Assembly",
		createdAt: "2025-11-22",
	},
	{
		id: "rev-003",
		agentId: "agt-002",
		customerName: "Jordan Lee",
		customerAvatar: avatar("Jordan Lee"),
		rating: 5,
		comment:
			"Suki waited 4 hours at the DMV for me. She even got a good number. Legend.",
		category: "Queue Standing",
		createdAt: "2025-12-05",
	},
	{
		id: "rev-004",
		agentId: "agt-002",
		customerName: "Chris Pine",
		customerAvatar: avatar("Chris Pine"),
		rating: 4,
		comment:
			"Great at shopping but took a bit long picking between two nearly identical white t-shirts.",
		category: "Personal Shopping",
		createdAt: "2025-10-18",
	},
	{
		id: "rev-005",
		agentId: "agt-003",
		customerName: "Sam Rivera",
		customerAvatar: avatar("Sam Rivera"),
		rating: 5,
		comment:
			"Devon was the perfect plus-one at my sister's wedding. My entire family loved him. Mom won't stop asking when he's coming back.",
		category: "Event Plus-One",
		createdAt: "2025-12-01",
	},
	{
		id: "rev-006",
		agentId: "agt-003",
		customerName: "Taylor Kim",
		customerAvatar: avatar("Taylor Kim"),
		rating: 5,
		comment:
			"Hired Devon for a work gala. He charmed my boss and I got a promotion the next week. Coincidence? I think not.",
		category: "Event Plus-One",
		createdAt: "2025-11-15",
	},
	{
		id: "rev-007",
		agentId: "agt-004",
		customerName: "Pat Morgan",
		customerAvatar: avatar("Pat Morgan"),
		rating: 5,
		comment:
			"Priya fixed my wifi, set up my smart home, AND explained cloud storage to my dad. Priceless.",
		category: "Tech Support",
		createdAt: "2025-12-08",
	},
	{
		id: "rev-008",
		agentId: "agt-004",
		customerName: "Casey Adams",
		customerAvatar: avatar("Casey Adams"),
		rating: 5,
		comment:
			"She debugged a production issue in 20 minutes that our team couldn't solve in 2 days. Hire her.",
		category: "Tech Support",
		createdAt: "2025-11-30",
	},
	{
		id: "rev-009",
		agentId: "agt-005",
		customerName: "Robin West",
		customerAvatar: avatar("Robin West"),
		rating: 5,
		comment:
			"My cat hates everyone but somehow fell asleep in Jamal's lap within 10 minutes.",
		category: "Pet Sitting",
		createdAt: "2025-10-25",
	},
	{
		id: "rev-010",
		agentId: "agt-006",
		customerName: "Drew Bailey",
		customerAvatar: avatar("Drew Bailey"),
		rating: 5,
		comment:
			"Elena found me a designer jacket for $40 at a thrift store. I looked like a million bucks at the interview.",
		category: "Personal Shopping",
		createdAt: "2025-12-03",
	},
	{
		id: "rev-011",
		agentId: "agt-006",
		customerName: "Jamie Fox",
		customerAvatar: avatar("Jamie Fox"),
		rating: 4,
		comment:
			"Great taste, really pushed me out of my comfort zone. My wallet is lighter but my closet is fire.",
		category: "Personal Shopping",
		createdAt: "2025-11-20",
	},
	{
		id: "rev-012",
		agentId: "agt-007",
		customerName: "Riley Quinn",
		customerAvatar: avatar("Riley Quinn"),
		rating: 4,
		comment:
			"Tommy built my KALLAX in record time. Only one mystery screw left over. Acceptable losses.",
		category: "Furniture Assembly",
		createdAt: "2025-11-08",
	},
	{
		id: "rev-013",
		agentId: "agt-008",
		customerName: "Morgan Ellis",
		customerAvatar: avatar("Morgan Ellis"),
		rating: 5,
		comment:
			"Ava came to Thanksgiving dinner and redirected every 'when are you getting married' question. Guardian angel.",
		category: "Companionship",
		createdAt: "2025-11-28",
	},
	{
		id: "rev-014",
		agentId: "agt-009",
		customerName: "Charlie Ross",
		customerAvatar: avatar("Charlie Ross"),
		rating: 4,
		comment:
			"Riku ran all my errands while I binge-watched a show guilt-free. This is the future.",
		category: "Errand Running",
		createdAt: "2025-12-07",
	},
	{
		id: "rev-015",
		agentId: "agt-010",
		customerName: "Blake Santos",
		customerAvatar: avatar("Blake Santos"),
		rating: 5,
		comment:
			"Zara turned my lame house party into an actual event. She brought the energy, the playlist, and somehow a fog machine.",
		category: "Event Plus-One",
		createdAt: "2025-12-12",
	},
	{
		id: "rev-016",
		agentId: "agt-010",
		customerName: "Avery Hart",
		customerAvatar: avatar("Avery Hart"),
		rating: 5,
		comment:
			"She organized my birthday party in 2 days and it was the best one I've ever had. I cried.",
		category: "Event Planning",
		createdAt: "2025-11-05",
	},
	{
		id: "rev-017",
		agentId: "agt-011",
		customerName: "Sage Cooper",
		customerAvatar: avatar("Sage Cooper"),
		rating: 5,
		comment:
			"Leo pushed me through my first 10K. Couldn't have done it without his motivation (and mild shaming).",
		category: "Fitness Buddy",
		createdAt: "2025-12-09",
	},
	{
		id: "rev-018",
		agentId: "agt-012",
		customerName: "Reese Harper",
		customerAvatar: avatar("Reese Harper"),
		rating: 5,
		comment:
			"Nina organized my entire apartment and I can finally see my floor. She only sighed twice at my mess.",
		category: "Home Organization",
		createdAt: "2025-12-11",
	},
	{
		id: "rev-019",
		agentId: "agt-012",
		customerName: "Quinn Davies",
		customerAvatar: avatar("Quinn Davies"),
		rating: 5,
		comment:
			"She organized my pantry so beautifully I started cooking just to show it off. Life-changing.",
		category: "Home Organization",
		createdAt: "2025-11-18",
	},
	{
		id: "rev-020",
		agentId: "agt-003",
		customerName: "Skyler Nash",
		customerAvatar: avatar("Skyler Nash"),
		rating: 4,
		comment:
			"Devon was amazing but almost TOO charming. My grandma now likes him more than me.",
		category: "Companionship",
		createdAt: "2025-10-30",
	},
];

// Mock Bookings
export const INITIAL_BOOKINGS: Booking[] = [
	{
		id: "bk-001",
		agentId: "agt-001",
		agentName: "Marcus Cole",
		customerName: "You",
		category: "Moving Help",
		date: "2026-02-25",
		startTime: "09:00",
		endTime: "13:00",
		hours: 4,
		totalCost: 180,
		status: "confirmed",
		notes: "Studio apartment, 3rd floor walkup",
		createdAt: "2026-02-20",
	},
	{
		id: "bk-002",
		agentId: "agt-004",
		agentName: "Priya Sharma",
		customerName: "You",
		category: "Tech Support",
		date: "2026-02-15",
		startTime: "14:00",
		endTime: "16:00",
		hours: 2,
		totalCost: 110,
		status: "completed",
		notes: "Set up new home office network",
		createdAt: "2026-02-10",
	},
	{
		id: "bk-003",
		agentId: "agt-003",
		agentName: "Devon Wright",
		customerName: "You",
		category: "Event Plus-One",
		date: "2026-03-01",
		startTime: "18:00",
		endTime: "23:00",
		hours: 5,
		totalCost: 325,
		status: "pending",
		notes: "Company gala, formal attire",
		createdAt: "2026-02-22",
	},
];

// Helper functions
export function getAgentsByCategory(
	agents: Agent[],
	categoryName: string,
): Agent[] {
	return agents.filter((a) =>
		a.categories.some((c) => c.toLowerCase() === categoryName.toLowerCase()),
	);
}

export function getReviewsByAgent(
	reviews: Review[],
	agentId: string,
): Review[] {
	return reviews.filter((r) => r.agentId === agentId);
}

export function searchAgents(agents: Agent[], query: string): Agent[] {
	const q = query.toLowerCase();
	return agents.filter(
		(a) =>
			a.name.toLowerCase().includes(q) ||
			a.bio.toLowerCase().includes(q) ||
			a.categories.some((c) => c.toLowerCase().includes(q)) ||
			a.location.toLowerCase().includes(q),
	);
}

export function generateId(prefix: string): string {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}
