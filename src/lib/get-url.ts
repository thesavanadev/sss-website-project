import { env } from "@/lib/env";

import canUseDOM from "@/lib/can-use-dom";

export const getServerSideURL = () => {
	let url = env.NEXT_PUBLIC_SERVER_URL;

	return url;
};

export const getClientSideURL = () => {
	if (canUseDOM) {
		const protocol = window.location.protocol;
		const domain = window.location.hostname;
		const port = window.location.port;

		return `${protocol}//${domain}${port ? `:${port}` : ""}`;
	}

	return env.NEXT_PUBLIC_SERVER_URL;
};
