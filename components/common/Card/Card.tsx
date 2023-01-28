import { CardProps } from "./Card.interface";
import styles from "./Card.module.scss";
import cn from "classnames";
import { FC } from "react";

export const Card: FC<CardProps> = ({ color = "white", className, children, ...props }) => {
	return (
		<div
			className={cn(styles.card, className, {
				[styles.blue]: color === "blue"
			})}
			{...props}>
			{children}
		</div>
	);
};
