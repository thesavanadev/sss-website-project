import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";

import { isAdminOrHasSiteAccessOrPublished } from "@/payload/access/is-admin-or-has-site-access-or-published";
import { isAuthenticated } from "@/payload/access/is-authenticated";

import { generatePreviewPath } from "@/lib/generate-preview-path";

import { slugField } from "@/payload/fields/slug";

import { populatePublishedAt } from "@/payload/hooks/populate-published-at";
import { revalidateDelete, revalidatePage } from "@/payload/collections/pages/hooks/revalidate-page";

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
	admin: {
		defaultColumns: ["title", "slug", "updatedAt"],
		livePreview: {
			url: ({ data, req }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === "string" ? data.slug : "",
					collection: "pages",
					req,
				});

				return path;
			},
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: typeof data?.slug === "string" ? data.slug : "",
				collection: "pages",
				req,
			}),
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			label: "Page Title",
			type: "text",
			required: true,
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Layout",
					fields: [],
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: "media",
						}),
						MetaDescriptionField({}),
						PreviewField({
							// if the `generateUrl` function is configured
							hasGenerateFn: true,

							// field paths to match the target field for data
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
		...slugField(),
		{
			name: "publishedAt",
			label: "Published At",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "dayOnly",
					displayFormat: "do MMM yyyy",
				},
				position: "sidebar",
			},
		},
	],
	hooks: {
		afterChange: [revalidatePage],
		beforeChange: [populatePublishedAt],
		afterDelete: [revalidateDelete],
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100, // this interval us set for optimal live preview
			},
			schedulePublish: true,
		},
		maxPerDoc: 50,
	},
};
