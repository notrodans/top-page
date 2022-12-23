import { FC } from "react"
import { ButtonProps } from "./Button.interface"
import cn from "classnames"
import ArrowIcon from "@assets/arrow.svg"

import styles from "./Button.module.scss"

export const Button: FC<ButtonProps> = ({
	appearance = "primary",
	arrow = "none",
	children,
	className,
	...props
}) => {
	return (
		<button
			{...props}
			className={cn(styles.button, className, {
				[styles.primary]: appearance === "primary",
				[styles.ghost]: appearance === "ghost"
			})}>
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
		</button>
	)
}
