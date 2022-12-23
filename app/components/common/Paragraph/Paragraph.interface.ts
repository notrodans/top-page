import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react"

export interface ParagraphProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
		PropsWithChildren {
	size?: "S" | "M" | "L"
}
