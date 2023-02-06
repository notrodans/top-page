import { ButtonProps } from "./Button.interface";
import styles from "./Button.module.scss";
import ArrowIcon from "@assets/arrow.svg";
import cn from "classnames";
import { FC } from "react";
import { motion, useMotionValue } from "framer-motion";

export const Button: FC<ButtonProps> = ({
	appearance = "primary",
	arrow = "none",
	children,
	className,
	...props
}) => {
	const scale = useMotionValue(1);

	return (
		<motion.button
			{...props}
			whileHover={{ scale: 1.05 }}
			className={cn(styles.button, className, {
				[styles.primary]: appearance === "primary",
				[styles.ghost]: appearance === "ghost"
			})}
			style={{ scale }}>
			{children}
			{arrow !== "none" && (
				<span
					className={cn(styles.arrow, {
						[styles.top]: arrow === "right",
						[styles.down]: arrow === "down"
					})}>
					<ArrowIcon />
				</span>
			)}
		</motion.button>
	);
};
