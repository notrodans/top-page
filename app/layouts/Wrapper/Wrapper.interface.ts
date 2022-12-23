import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react"

export interface WrapperProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		PropsWithChildren {}
