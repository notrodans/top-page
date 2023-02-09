import cn from "classnames";
import { FC, KeyboardEvent } from "react";
import styles from "./Sort.module.scss";
import { SortEnum, SortProps } from "./Sort.interface";
import SortIcon from "./sort.svg";

export const Sort: FC<SortProps> = ({ sort, setSort, className, ...props }) => {
	function handleKey(e: KeyboardEvent, s: SortEnum) {
		if (e.key === "Space" || e.key === "Enter") {
			if (s === SortEnum.Rating) {
				setSort(SortEnum.Rating);
			} else {
				setSort(SortEnum.Price);
			}
		}
	}

	return (
		<div className={cn(styles.sort, className)} {...props}>
			<div className={styles.sortName} id='sort'>
				Сортировка
			</div>
			<button
				aria-labelledby='sort rating'
				aria-selected={sort === SortEnum.Rating}
				id='rating'
				onKeyDown={e => handleKey(e, SortEnum.Rating)}
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}
			>
				<SortIcon className={styles.sortIcon} />
				По рейтингу
			</button>
			<button
				id='price'
				aria-labelledby='sort price'
				aria-selected={sort === SortEnum.Price}
				tabIndex={0}
				onKeyDown={e => handleKey(e, SortEnum.Price)}
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}
			>
				<SortIcon className={styles.sortIcon} />
				По цене
			</button>
		</div>
	);
};
