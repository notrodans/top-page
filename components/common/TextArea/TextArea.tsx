import cn from "classnames";
import { forwardRef } from "react";
import { TextAreaProps } from "./TextArea.interface";
import styles from "./TextArea.module.scss";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ error, className, ...props }, ref) => {
		return (
			<div className={cn(styles.textareaWrapper, className)}>
				<textarea
					className={cn(styles.textarea, {
						[styles.error]: error
					})}
					ref={ref}
					{...props}
				/>
				{error && <span className={styles.errorMessage}>{error.message}</span>}
			</div>
		);
	}
);
