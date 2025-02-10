import { GlobalConfig } from "payload";

import { isAuthenticated } from "@/payload/access/is-authenticated";
import { isPublic } from "@/payload/access/is-public";

import { revalidateHeader } from "@/payload/blocks/globals/header/hooks/revalidate-header";

export const Header: GlobalConfig = {
	slug: "header",
	access: {
		// anyone can read
		read: isPublic,
		// authenticated users can update
		update: isAuthenticated,
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "title",
					label: "Site Title",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "slogan",
					label: "Site Slogan",
					type: "text",
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "logo",
			label: "Site Logo",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "navigationLinks",
			label: "Navigation Links",
			labels: {
				singular: "Navigation Links",
				plural: "Navigation Links",
			},
			type: "array",
			fields: [
				{
					name: "navigationHeaderOptions",
					label: "Do you need a Navigation Header?",
					type: "radio",
					options: [
						{
							label: "Yes",
							value: "yes",
						},
						{
							label: "No",
							value: "no",
						},
					],
					defaultValue: "no",
					admin: {
						layout: "horizontal",
					},
				},
				{
					name: "navigationHeaderText",
					label: "Navigation Header",
					type: "text",
					admin: {
						condition: (_, siblingData) => siblingData?.navigationHeaderOptions === "yes",
					},
				},
				{
					name: "navigationLink",
					label: "Links",
					labels: {
						singular: "Navigation Link",
						plural: "Navigation Links",
					},
					type: "array",
					fields: [
						{
							type: "row",
							fields: [
								{
									name: "navigationLinkLabel",
									label: "Navigation Link Label",
									type: "text",
									admin: {
										width: "50%",
									},
								},
								{
									name: "navigationLinkURL",
									label: "Navigation Link URL",
									type: "text",
									admin: {
										width: "50%",
									},
								},
							],
						},
						{
							name: "navigationLinkNewTab",
							label: "Open in New Tab",
							type: "checkbox",
							admin: {
								width: "50%",
							},
						},
					],
					minRows: 1,
					maxRows: 5,
				},
			],
			minRows: 1,
			maxRows: 5,
		},
		{
			name: "ctaNavigationLink",
			label: "Call to Action Link",
			labels: {
				singular: "Call to Action Link",
				plural: "Call to Action Link",
			},
			type: "array",
			fields: [
				{
					type: "row",
					fields: [
						{
							name: "navigationLinkLabel",
							label: "Navigation Link Label",
							type: "text",
							admin: {
								width: "50%",
							},
						},
						{
							name: "navigationLinkURL",
							label: "Navigation Link URL",
							type: "text",
							admin: {
								width: "50%",
							},
						},
						{
							name: "navigationLinkNewTab",
							label: "Open in New Tab",
							type: "checkbox",
							admin: {
								width: "50%",
							},
						},
					],
				},
			],
			minRows: 1,
			maxRows: 1,
		},
	],
	hooks: {
		afterChange: [revalidateHeader],
	},
};
