import { unstable_cache } from "next/cache";

import { getPayload } from "payload";
import config from "@payload-config";

import type { Config } from "@/payload-types";

type Collection = keyof Config["collections"];

async function getDocument(collection: Collection, slug: string, depth = 0) {
	const payload = await getPayload({ config: config });

	const page = await payload.find({
		collection,
		depth,
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	return page.docs[0];
}

// returns a unstable_cache function mapped with the cache tag for the slug
export const getCachedDocument = (collection: Collection, slug: string) =>
	unstable_cache(async () => getDocument(collection, slug), [collection, slug], {
		tags: [`${collection}_${slug}`],
	});
