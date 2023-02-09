import { Button, Input } from "@components/common";
import cn from "classnames";
import { useRouter } from "next/router";
import { FC, KeyboardEvent, useState } from "react";
import GlassIcon from "./glass.svg";
import { SearchProps } from "./Search.interface";
import styles from "./Search.module.scss";

export const Search: FC<SearchProps> = ({ className, ...props }) => {
	const [search, setSearch] = useState<string>();
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: "/search",
			query: {
				q: search
			}
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			goToSearch();
		}
	};

	return (
		<form className={cn(styles.search, className)} {...props} role='search'>
			<Input
				className={styles.input}
				placeholder='Поиск'
				value={search}
				onChange={e => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance='primary'
				className={styles.button}
				onClick={goToSearch}
				aria-label='Искать по сайту'
			>
				<GlassIcon />
			</Button>
		</form>
	);
};
