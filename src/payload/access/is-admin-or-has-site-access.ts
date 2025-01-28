import type { Access } from "payload";

export const isAdminOrHasSiteAccess =
	(siteIDFieldName: string = "site"): Access =>
	({ req: { user } }) => {
		// need to be signed in
		if (user) {
			// if user has role of 'admin'
			if (user.roles?.includes("admin")) return true;

			// if user has role of 'editor' and has access to a site,
			// return a query constraint to restrict the documents this user can edit
			// to only those that are assigned to a site, or have no site assigned
			if (user.roles?.includes("editor") && user.sites!.length > 0) {
				// otherwise, we can restrict it based on the `site` field
				return {
					or: [
						{
							[siteIDFieldName]: {
								in: user.sites,
							},
						},
						{
							[siteIDFieldName]: {
								exists: false,
							},
						},
					],
				};
			}
		}

		// reject everyone else
		return false;
	};
