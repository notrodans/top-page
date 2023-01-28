import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

export interface CardProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		PropsWithChildren {
	color?: "white" | "blue";
}
