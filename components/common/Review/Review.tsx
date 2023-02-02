import cn from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { FC } from "react";
import { Rating } from "..";
import { ReviewProps } from "./Review.interface";
import styles from "./Review.module.scss";
import UserIcon from "./user.svg";

export const Review: FC<ReviewProps> = ({ review, className, ...props }) => {
	const { name, title, description, createdAt, rating } = review;
	return (
		<div className={cn(styles.review, className)} {...props}>
			<UserIcon className={styles.user} />
			<div className={styles.title}>
				<span className={styles.name}>{name}:</span>&nbsp;&nbsp;
				<span>{title}</span>
			</div>
			<div className={styles.date}>
				{format(new Date(createdAt), "dd MMMM yyyy", { locale: ru })}
			</div>
			<div className={styles.rating}>
				<Rating rating={rating} />
			</div>
			<div className={styles.description}>{description}</div>
		</div>
	);
};
