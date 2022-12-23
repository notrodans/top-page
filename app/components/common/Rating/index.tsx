import { FC, useEffect, useState, KeyboardEvent } from "react"
import { RatingProps } from "./Rating.interface"
import cn from "classnames"
import StarIcon from "@assets/star.svg"
import styles from "./Rating.module.scss"

export const Rating: FC<RatingProps> = ({
	rating,
	setRating,
	isEditable = false,
	className,
	...props
}) => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))

	const constructingRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((_, i: number) => (
			<StarIcon
				key={i}
				tabIndex={isEditable ? 0 : 1}
				onKeyDown={e => isEditable && handleSpace(i + 1, e)}
				className={cn(styles.star, {
					[styles.fill]: i < currentRating,
					[styles.editable]: isEditable
				})}
			/>
		))
		setRatingArray(updatedArray)
	}

	useEffect(() => {
		constructingRating(rating)
	}, [rating])

	function changeDisplay(rating: number) {
		if (!isEditable) return
		constructingRating(rating)
	}

	function onClick(rating: number) {
		if (!isEditable || !setRating) return
		setRating(rating)
	}

	function handleSpace(rating: number, e: KeyboardEvent<SVGAElement>) {
		if (e.code !== "Space" || !setRating) return
		setRating(rating)
	}

	return (
		<div className={className} {...props}>
			{ratingArray.map((r, i) => (
				<span
					key={i}
					className={styles.star}
					onClick={() => onClick(i + 1)}
					onMouseEnter={() => changeDisplay(i + 1)}
					onMouseLeave={() => changeDisplay(rating)}>
					{r}
				</span>
			))}
		</div>
	)
}
