import { TagProps } from "./Tag.interface";
import styles from "./Tag.module.scss";
import cn from "classnames";
import { FC } from "react";

export const Tag: FC<TagProps> = ({
	size = "s",
	color = "ghost",
	href,
	children,
	className,
	...props
}) => {
	return (
		<div
			{...props}
			className={cn(styles.tag, className, {
				[styles.s]: size === "s",
				[styles.m]: size === "m",
				[styles.ghost]: color === "ghost",
				[styles.red]: color === "red",
				[styles.gray]: color === "gray",
				[styles.green]: color === "green",
				[styles.primary]: color === "primary"
			})}>
			{href ? <a>{children}</a> : <>{children}</>}
		</div>
	);
};
