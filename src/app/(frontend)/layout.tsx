import { ReactNode } from "react";
import { Comfortaa as FontHeader, Montserrat as FontBody } from "next/font/google";
import { draftMode } from "next/headers";

import { cn } from "@/lib/utils";
import { mergeOpenGraph } from "@/lib/merge-opengraph";

import { Header } from "@/payload/blocks/globals/header/component";
import { Footer } from "@/payload/blocks/globals/footer/component";

import { ThemeProvider } from "@/components/theme-provider";

import { getServerSideURL } from "@/lib/get-url";

import type { Metadata } from "next";

import "@/frontend/globals.css";

const fontHeader = FontHeader({ subsets: ["latin"], variable: "--font-header" });
const fontBody = FontBody({ subsets: ["latin"], variable: "--font-body" });

const RootLayout = async ({ children }: { children: ReactNode }) => {
	const { isEnabled } = await draftMode();

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
			</head>

			<body className={cn("flex h-screen flex-col", fontHeader.variable, fontBody.variable)}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<header>
						<Header />
					</header>

					<main>{children}</main>

					<footer className="mt-auto">
						<Footer />
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;

export const metadata: Metadata = {
	metadataBase: new URL(getServerSideURL()),
	openGraph: mergeOpenGraph(),
	twitter: {
		card: "summary_large_image",
		creator: "@thesavanadev",
	},
};
