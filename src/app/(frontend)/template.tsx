"use client";

import { ReactNode } from "react";

import { motion } from "motion/react";

const template = ({ children }: { children: ReactNode }) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeInOut", duration: 0.75 }}>
			{children}
		</motion.div>
	);
};

export default template;
