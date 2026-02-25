import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const base = process.env.GITHUB_REPOSITORY
	? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
	: "";

export const metadata: Metadata = {
	title: "RENT A HUMAN | Human as a Service",
	description:
		"Browse, book, and review real humans for any task. Moving, companionship, tech support, queue standing, and more. The marketplace for human services.",
	generator: "v0.app",
	icons: {
		icon: [
			{ url: `${base}/favicon.ico`, sizes: "any" },
			{
				url: `${base}/icon-light-32x32.png`,
				media: "(prefers-color-scheme: light)",
			},
			{
				url: `${base}/icon-dark-32x32.png`,
				media: "(prefers-color-scheme: dark)",
			},
			{ url: `${base}/icon.svg`, type: "image/svg+xml" },
		],
		apple: `${base}/apple-icon.png`,
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
	const faviconHref = base ? `${base}/favicon.ico` : "/favicon.ico";
	return (
		<html lang="en" className="dark">
			<head>
				<link rel="icon" href={faviconHref} sizes="any" />
			</head>
			<body className="font-sans antialiased">
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
