import cn from "classnames";
import { FC } from "react";
import { InputProps } from "./Input.interface";
import styles from "./Input.module.scss";

export const Input: FC<InputProps> = ({ className, ...props }) => {
	return <input className={cn(styles.input, className)} {...props} />;
};
