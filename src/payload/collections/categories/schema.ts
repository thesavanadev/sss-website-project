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
		{
			name: "site",
			type: "relationship",
			relationTo: "sites",
			required: true,
			// if user is not admin, set the site by default to the first site
			// that they have access to.
			defaultValue: ({ user }: { user: { roles: string[]; sites?: string[] } }) => {
				if (!user.roles.includes("admin") && user.sites?.[0]) {
					return user.sites[0];
				}
			},
		},
	],
};
