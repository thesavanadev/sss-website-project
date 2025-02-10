import { unstable_cache } from "next/cache";

import { getPayload } from "payload";
import config from "@payload-config";

import type { Config } from "@/payload-types";

type Global = keyof Config["globals"];

async function getGlobal(slug: Global, depth = 0) {
	const payload = await getPayload({ config: config });

	const global = await payload.findGlobal({ slug, depth });

	return global;
}

// returns a unstable_cache function mapped with the cache tag for the slug
export const getCachedGlobal = (slug: Global, depth = 0) =>
	unstable_cache(async () => getGlobal(slug, depth), [slug], {
		tags: [`global_${slug}`],
	});
