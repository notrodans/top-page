import { useScrollY } from "@hooks/useScrollY";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { ButtonIcon } from "..";
import styles from "./Up.module.scss";

export const Up = () => {
	const controls = useAnimation();
	const y = useScrollY();

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight });
	}, [y, controls]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	return (
		<motion.div
			animate={controls}
			initial={{ opacity: 0 }}
			onClick={scrollToTop}
			className={styles.up}>
			<ButtonIcon icon='arrow' />
		</motion.div>
	);
};