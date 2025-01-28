import type { Access } from "payload";

export const isAdminOrSelf: Access = ({ req: { user } }) => {
	// need to be signed in
	if (user) {
		// if user has role of 'admin'
		if (user.roles?.includes("admin")) {
			return true;
		}

		// if any other type of user, only provide access to their data
		return {
			id: {
				equals: user.id,
			},
		};
	}

	// reject everyone else
	return false;
};
