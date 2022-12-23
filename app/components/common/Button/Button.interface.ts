import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react"

export interface ButtonProps
	extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
		PropsWithChildren {
	appearance?: "primary" | "ghost"
	arrow?: "right" | "down" | "none"
}
