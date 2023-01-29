import cn from "classnames";
import { FC } from "react";
import { DividerhProps } from "./Divider.interface";
import styles from "./Divider.module.scss";

export const Divider: FC<DividerhProps> = ({ className, ...props }) => {
	return <hr className={cn(styles.divider, className)} {...props} />;
};
