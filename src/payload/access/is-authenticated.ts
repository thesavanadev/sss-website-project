import type { Access } from "payload";
import type { User } from "@/payload-types";

export const isAuthenticated: Access<User> = ({ req: { user } }) => {
	// return true if user is authenticated, false if not
	return Boolean(user);
};
