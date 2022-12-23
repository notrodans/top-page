import { FC } from "react"
import { SidebarProps } from "./Sidebar.interface"
import styles from "./Sidebar.module.scss"

export const Sidebar: FC<SidebarProps> = ({ ...props }) => {
	return <div {...props}>Sidebar</div>
}
