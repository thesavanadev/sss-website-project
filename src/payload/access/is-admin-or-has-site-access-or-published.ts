import type { Access, AccessResult } from "payload";

export const isAdminOrHasSiteAccessOrPublished: Access = ({ req: { user } }) => {
	// need to be signed in
	if (user) {
		// if user has role of 'admin'
		if (user.roles?.includes("admin")) return true as AccessResult;

		// if user has role of 'editor' and has access to a site,
		// return a query constraint to restrict the documents this user can edit
		// to only those that are assigned to a site, or have no site assigned
		if (user.roles?.includes("editor") && user.sites!.length > 0) {
			return {
				or: [
					{
						site: {
							in: user.sites,
						},
					},
					{
						site: {
							exists: false,
						},
					},
				],
			} as AccessResult;
		}
	}

	// non-signed in users can only read published docs
	return {
		_status: {
			equals: "published",
		},
	} as AccessResult;
};
