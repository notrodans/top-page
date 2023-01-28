import { FooterProps } from "./Footer.interface";
import styles from "./Footer.module.scss";
import cn from "classnames";
import { format } from "date-fns";
import { FC } from "react";

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
	return (
		<footer {...props} className={cn(className, styles.footer)}>
			<div>OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены</div>
			<a href='#' target='_blank'>
				Пользовательское соглашение
			</a>
			<a href='#' target='_blank'>
				Политика конфиденциальности
			</a>
		</footer>
	);
};
