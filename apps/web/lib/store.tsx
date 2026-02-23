"use client";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
	type ReactNode,
} from "react";
import {
	type Agent,
	type Category,
	type Booking,
	type Review,
	INITIAL_AGENTS,
	INITIAL_CATEGORIES,
	INITIAL_BOOKINGS,
	INITIAL_REVIEWS,
	generateId,
	slugify,
} from "./data";
import { getAgents } from "./api";

interface StoreContextType {
	agents: Agent[];
	categories: Category[];
	bookings: Booking[];
	reviews: Review[];
	refetchAgents: () => Promise<void>;
	addCategory: (name: string) => Category;
	addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Booking;
	addReview: (review: Omit<Review, "id" | "createdAt">) => Review;
	getCategoryBySlug: (slug: string) => Category | undefined;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
	const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
	const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
	const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
	const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

	useEffect(() => {
		getAgents()
			.then((list) => list?.length && setAgents(list))
			.catch(() => {});
	}, []);

	const refetchAgents = useCallback(() => {
		return getAgents()
			.then((list) => list?.length && setAgents(list))
			.catch(() => {});
	}, []);

	const addCategory = useCallback(
		(name: string): Category => {
			const existing = categories.find(
				(c) => c.name.toLowerCase() === name.toLowerCase(),
			);
			if (existing) return existing;

			const newCat: Category = {
				id: generateId("cat"),
				name,
				slug: slugify(name),
				agentCount: 0,
				description: `Agents available for ${name.toLowerCase()}`,
			};
			setCategories((prev) => [...prev, newCat]);
			return newCat;
		},
		[categories],
	);

	const addBooking = useCallback(
		(booking: Omit<Booking, "id" | "createdAt">): Booking => {
			const newBooking: Booking = {
				...booking,
				id: generateId("bk"),
				createdAt: new Date().toISOString().split("T")[0],
			};
			setBookings((prev) => [...prev, newBooking]);
			return newBooking;
		},
		[],
	);

	const addReview = useCallback(
		(review: Omit<Review, "id" | "createdAt">): Review => {
			const newReview: Review = {
				...review,
				id: generateId("rev"),
				createdAt: new Date().toISOString().split("T")[0],
			};
			setReviews((prev) => [...prev, newReview]);
			return newReview;
		},
		[],
	);

	const getCategoryBySlug = useCallback(
		(slug: string) => categories.find((c) => c.slug === slug),
		[categories],
	);

	return (
		<StoreContext.Provider
			value={{
				agents,
				categories,
				bookings,
				reviews,
				refetchAgents,
				addCategory,
				addBooking,
				addReview,
				getCategoryBySlug,
			}}
		>
			{children}
		</StoreContext.Provider>
	);
}

export function useStore() {
	const ctx = useContext(StoreContext);
	if (!ctx) throw new Error("useStore must be used within StoreProvider");
	return ctx;
}
