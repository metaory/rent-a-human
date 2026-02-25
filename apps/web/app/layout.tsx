import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "RENT A HUMAN | Human as a Service",
	description:
		"Browse, book, and review real humans for any task. Moving, companionship, tech support, queue standing, and more. The marketplace for human services.",
	generator: "v0.app",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{
				url: "/icon-light-32x32.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/icon-dark-32x32.png",
				media: "(prefers-color-scheme: dark)",
			},
			{ url: "/icon.svg", type: "image/svg+xml" },
		],
		apple: "/apple-icon.png",
	},
};

export const viewport: Viewport = {
	themeColor: "#141414",
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body className="font-sans antialiased">
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
