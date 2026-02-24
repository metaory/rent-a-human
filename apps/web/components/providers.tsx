"use client";

import { StoreProvider } from "@/lib/store";
import TargetCursor from "@/components/TargetCursor";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<StoreProvider>
			{children}
			<TargetCursor />
			<Toaster
				theme="dark"
				toastOptions={{
					style: {
						background: "oklch(0.12 0 0)",
						border: "1px solid oklch(0.22 0 0)",
						color: "oklch(0.95 0 0)",
					},
				}}
			/>
		</StoreProvider>
	);
}
