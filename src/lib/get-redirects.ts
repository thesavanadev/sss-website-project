import { unstable_cache } from "next/cache";

import { getPayload } from "payload";
import config from "@payload-config";

export async function getRedirects(depth = 1) {
	const payload = await getPayload({ config: config });

	const { docs: redirects } = await payload.find({
		collection: "redirects",
		depth,
		limit: 0,
		pagination: false,
	});

	return redirects;
}

/**
 * returns a unstable_cache function mapped with the cache tag for 'redirects'.
 *
 * cache all redirects together to avoid multiple fetches.
 */
export const getCachedRedirects = () =>
	unstable_cache(async () => getRedirects(), ["redirects"], {
		tags: ["redirects"],
	});
