import { ParagraphProps } from "./Paragraph.interface";
import styles from "./Paragraph.module.scss";
import cn from "classnames";
import { FC } from "react";

export const Paragraph: FC<ParagraphProps> = ({ size = "S", className, children, ...props }) => {
	return (
		<p
			{...props}
			className={cn(styles.p, className, {
				[styles.s]: size === "S",
				[styles.m]: size === "M",
				[styles.l]: size === "L"
			})}>
			{children}
		</p>
	);
};
