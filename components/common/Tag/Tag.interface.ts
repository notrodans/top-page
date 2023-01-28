import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

export interface TagProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		PropsWithChildren {
	size: "s" | "m";
	color?: "ghost" | "red" | "gray" | "green" | "primary";
	href?: string;
}
