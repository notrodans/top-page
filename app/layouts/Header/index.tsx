import { FC } from "react"
import { HeaderProps } from "./Header.interface"
import styles from "./Header.module.scss"

export const Header: FC<HeaderProps> = ({ ...props }) => {
	return <div {...props}>Header</div>
}
