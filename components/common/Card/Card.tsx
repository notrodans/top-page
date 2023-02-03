import cn from "classnames";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { CardProps } from "./Card.interface";
import styles from "./Card.module.scss";

export const Card = motion(
	forwardRef<HTMLDivElement, CardProps>(
		({ color = "white", className, children, ...props }, ref) => {
			return (
				<div
					ref={ref}
					className={cn(styles.card, className, {
						[styles.blue]: color === "blue"
					})}
					{...props}>
					{children}
				</div>
			);
		}
	)
);
