import { ButtonIconProps, icons } from "./ButtonIcon.interface";
import styles from "./ButtonIcon.module.scss";
import cn from "classnames";
import { FC } from "react";

export const ButtonIcon: FC<ButtonIconProps> = ({
	appearance = "primary",
	icon,
	className,
	...props
}) => {
	const IconComponent = icons[icon];
	return (
		<button
			{...props}
			className={cn(styles.button, className, {
				[styles.primary]: appearance === "primary",
				[styles.white]: appearance === "white"
			})}
		>
			<IconComponent />
		</button>
	);
};
