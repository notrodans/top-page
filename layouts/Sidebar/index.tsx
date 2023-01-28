import { SidebarProps } from "./Sidebar.interface";
import styles from "./Sidebar.module.scss";
import { Menu } from "@layouts/Menu";
import { FC } from "react";

export const Sidebar: FC<SidebarProps> = ({ ...props }) => {
	return (
		<div {...props}>
			<Menu />
		</div>
	);
};
