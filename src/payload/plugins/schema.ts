import { Plugin } from "payload";

import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

import { getServerSideURL } from "@/lib/get-url";
import { revalidateRedirects } from "@/payload/hooks/revalidate-redirects";
import { beforeSyncWithSearch } from "@/payload/search/before-sync";
import { searchFields } from "@/payload/search/field-overrides";

import { Media } from "@/payload/collections/media/schema";

import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Page, Post } from "@/payload-types";

import { env } from "@/lib/env";

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
	return doc?.title ? `${doc.title} | Superior Software Solutions` : "Superior Software Solutions";
};

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
	const url = getServerSideURL();

	return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
	formBuilderPlugin({
		fields: {
			payment: false,
		},
		formOverrides: {
			fields: ({ defaultFields }) => {
				return defaultFields.map((field) => {
					if ("name" in field && field.name === "confirmationMessage") {
						return {
							...field,
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [...rootFeatures, FixedToolbarFeature(), HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] })];
								},
							}),
						};
					}
					return field;
				});
			},
		},
	}),
	redirectsPlugin({
		collections: ["pages", "posts"],
		overrides: {
			// @ts-expect-error - this is a valid override, mapped fields don't resolve to the same type
			fields: ({ defaultFields }) => {
				return defaultFields.map((field) => {
					if ("name" in field && field.name === "from") {
						return {
							...field,
							admin: {
								description: "You will need to rebuild the website when changing this field.",
							},
						};
					}
					return field;
				});
			},
			hooks: {
				afterChange: [revalidateRedirects],
			},
		},
	}),
	seoPlugin({ generateTitle, generateURL }),
	searchPlugin({
		collections: ["posts"],
		beforeSync: beforeSyncWithSearch,
		searchOverrides: {
			fields: ({ defaultFields }) => {
				return [...defaultFields, ...searchFields];
			},
		},
	}),
	uploadthingStorage({
		collections: {
			[Media.slug]: true,
		},
		options: {
			token: env.UPLOADTHING_TOKEN,
			acl: "public-read",
		},
	}),
];
