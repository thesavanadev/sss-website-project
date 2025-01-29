import { isAdminOrHasSiteAccessOrPublished } from "@/payload/access/is-admin-or-has-site-access-or-published";
import { isAuthenticated } from "@/payload/access/is-authenticated";

import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
	slug: "pages",
	labels: {
		singular: "Page",
		plural: "Pages",
	},
	access: {
		create: isAuthenticated,
		delete: isAuthenticated,
		read: isAdminOrHasSiteAccessOrPublished,
		update: isAuthenticated,
	},
	fields: [],
};
