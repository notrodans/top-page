import StarIcon from "./star.svg";
import cn from "classnames";
import { forwardRef, KeyboardEvent, useEffect, useRef, useState } from "react";
import { RatingProps } from "./Rating.interface";
import styles from "./Rating.module.scss";

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
	({ error, rating, setRating, isEditable = false, className, tabIndex, ...props }, ref) => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		function computeFocus(r: number, i: number): number {
			if (!isEditable) {
				return -1;
			}
			if (!rating && i === 0) {
				return tabIndex ?? 0;
			}
			if (r === i + 1) {
				return tabIndex ?? 0;
			}
			return -1;
		}

		function constructingRating(currentRating: number) {
			const updatedArray = ratingArray.map((r, i: number) => (
				<span
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable
					})}
					key={i}
					tabIndex={computeFocus(rating, i)}
					onClick={() => onClick(i + 1)}
					onKeyDown={handleKey}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}
					ref={r => ratingArrayRef.current?.push(r)}
					role={isEditable ? "slider" : ""}
					aria-label={isEditable ? "Укажите рейтинг" : "Рейтинг " + rating}
					aria-invalid={error ? true : false}
					aria-valuemax={5}
					aria-valuemin={1}
					aria-valuenow={r}
				>
					<StarIcon />
				</span>
			));
			setRatingArray(updatedArray);
		}

		useEffect(() => {
			constructingRating(rating);
		}, [rating, tabIndex]);

		function changeDisplay(rating: number) {
			if (!isEditable) return;
			constructingRating(rating);
		}

		function onClick(rating: number) {
			if (!isEditable || !setRating) return;
			setRating(rating);
		}

		function handleKey(e: KeyboardEvent) {
			if (!isEditable || !setRating) {
				return;
			}
			if (e.code === "ArrowRight" || e.code === "ArrowUp") {
				if (!rating) {
					setRating(1);
				} else {
					e.preventDefault();
					setRating(rating < 5 ? rating + 1 : 5);
				}
				ratingArrayRef.current[rating]?.focus();
			}
			if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		}

		return (
			<div
				ref={ref}
				className={cn(styles.rating, className, {
					[styles.error]: error
				})}
				{...props}
			>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}
				{error && (
					<span role='alert' className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
