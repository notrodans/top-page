import Logo from "@assets/logo.svg";
import { Search } from "@components/common";
import { Menu } from "@layouts/Menu";
import cn from "classnames";
import { FC } from "react";
import { SidebarProps } from "./Sidebar.interface";
import styles from "./Sidebar.module.scss";

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
	return (
		<div {...props} className={cn(className, styles.sidebar)}>
			<Logo className={styles.logo} />
			<Search />
			<Menu />
		</div>
	);
};
