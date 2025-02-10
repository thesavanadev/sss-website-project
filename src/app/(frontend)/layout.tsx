import { ReactNode } from "react";
import { Comfortaa as FontHeader, Montserrat as FontBody } from "next/font/google";

import { cn } from "@/lib/utils";

import { Header } from "@/payload/blocks/globals/header/component";
import { Footer } from "@/payload/blocks/globals/footer/component";

import { ThemeProvider } from "@/components/theme-provider";

import "@/frontend/globals.css";

const fontHeader = FontHeader({ subsets: ["latin"], variable: "--font-header" });
const fontBody = FontBody({ subsets: ["latin"], variable: "--font-body" });

const RootLayout = ({ children }: { children: ReactNode }) => {
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
