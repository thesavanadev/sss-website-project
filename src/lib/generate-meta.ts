import { mergeOpenGraph } from "@/lib/merge-opengraph";
import { getServerSideURL } from "@/lib/get-url";

import type { Metadata } from "next";
import type { Media, Page, Post, Config } from "@/payload-types";

const getImageURL = (image?: Media | Config["db"]["defaultIDType"] | null) => {
	const serverUrl = getServerSideURL();

	let url = serverUrl + "/sss-og.jpg";

	if (image && typeof image === "object" && "url" in image) {
		const ogUrl = image.sizes?.og?.url;

		url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
	}

	return url;
};

export const generateMeta = async (args: { doc: Partial<Page> | Partial<Post> | null }): Promise<Metadata> => {
	const { doc } = args;

	const ogImage = getImageURL(doc?.meta?.image);

	const title = doc?.meta?.title ? doc?.meta?.title + " | Superior Software Solutions" : "Superior Software Solutions";

	return {
		description: doc?.meta?.description,
		openGraph: mergeOpenGraph({
			description: doc?.meta?.description || "",
			images: ogImage
				? [
						{
							url: ogImage,
						},
					]
				: undefined,
			title,
			url: Array.isArray(doc?.slug) ? doc?.slug.join("/") : "/",
		}),
		title,
	};
};
