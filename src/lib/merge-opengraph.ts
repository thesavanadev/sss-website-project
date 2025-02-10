import { getServerSideURL } from "@/lib/get-url";

import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description:
		"Superior Software Solutions: Custom software development and technology consulting to drive efficiency, growth, and innovation for your business.",
	images: [
		{
			url: `${getServerSideURL()}/website-template-OG.webp`,
		},
	],
	siteName: "Superior Software Solutions",
	title: "Superior Software Solutions",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};
