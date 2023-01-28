import { SidebarProps } from "./Sidebar.interface";
import styles from "./Sidebar.module.scss";
import Logo from "@assets/logo.svg";
import { Menu } from "@layouts/Menu";
import cn from "classnames";
import { FC } from "react";

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
	return (
		<div {...props} className={cn(className, styles.sidebar)}>
			<Logo className={styles.logo} />
			<div>Поиск...</div>
			<Menu />
		</div>
	);
};
