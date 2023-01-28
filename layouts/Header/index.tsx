import { HeaderProps } from "./Header.interface";
import styles from "./Header.module.scss";
import { FC } from "react";

export const Header: FC<HeaderProps> = ({ ...props }) => {
	return <div {...props}>Header</div>;
};
