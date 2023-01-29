import cn from "classnames";
import { FC } from "react";
import { TextAreaProps } from "./TextArea.interface";
import styles from "./TextArea.module.scss";

export const TextArea: FC<TextAreaProps> = ({ className, ...props }) => {
	return <textarea className={cn(styles.textarea, className)} {...props} />;
};
