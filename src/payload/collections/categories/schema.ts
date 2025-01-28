import { isAuthenticated } from "@/payload/access/is-authenticated";
import { isPublic } from "@/payload/access/is-public";

import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
	slug: "categories",
	labels: {
		singular: "Category",
		plural: "Categories",
	},
	admin: {
		defaultColumns: ["title", "createdAt", "updatedAt"],
		useAsTitle: "title",
	},
	access: {
		create: isAuthenticated,
		delete: isAuthenticated,
		read: isPublic,
		update: isAuthenticated,
	},
	fields: [
		{
			name: "title",
			label: "Category Title",
			type: "text",
			required: true,
		},
	],
};
