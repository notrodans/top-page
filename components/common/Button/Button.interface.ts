import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

export interface ButtonProps
	extends Omit<
			DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
			"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
		>,
		PropsWithChildren {
	appearance?: "primary" | "ghost";
	arrow?: "right" | "down" | "none";
}
