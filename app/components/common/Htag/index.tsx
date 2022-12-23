import { FC } from "react"
import { HtagProps } from "./Htag.interface"
import cn from "classnames"

import styles from "./Htag.module.scss"

export const Htag: FC<HtagProps> = ({ tag, children, className, ...props }) => {
	switch (tag) {
		case "h1":
			return (
				<h1 {...props} className={cn(styles.h1, className)}>
					{children}
				</h1>
			)
		case "h2":
			return (
				<h2 {...props} className={cn(styles.h2, className)}>
					{children}
				</h2>
			)
		case "h2":
			return (
				<h3 {...props} className={cn(styles.h3, className)}>
					{children}
				</h3>
			)
		default:
			return <></>
	}
}
