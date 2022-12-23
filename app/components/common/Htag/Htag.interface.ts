import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react"

export interface HtagProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
		PropsWithChildren {
	tag: "h1" | "h2" | "h3"
}
