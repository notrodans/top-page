import cn from "classnames";
import { forwardRef } from "react";
import { InputProps } from "./Input.interface";
import styles from "./Input.module.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ error, className, ...props }, ref) => {
		return (
			<div className={cn(styles.inputWrapper, className)}>
				<input
					className={cn(styles.input, {
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
