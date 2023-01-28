import styles from "./Menu.module.scss";
import { AppContext } from "@context/app.context";
import { firstLevelMenu } from "@helpers/helpers";
import { FirstLevelMenuItem, PageItem } from "@interfaces/menu.interface";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext } from "react";

export const Menu: FC = () => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();

	const openSecondLevel = (secondCategory: string) => {
		setMenu?.(
			menu.map(m => {
				if (m._id.secondCategory === secondCategory) {
					m.isOpened = !m.isOpened;
				}
				return m;
			})
		);
	};

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map(m => (
					<li key={m.route}>
						<Link href={`/${m.route}`}>
							<a>
								<div
									className={cn(styles.firstLevel, {
										[styles.firstLevelActive]: m.id == firstCategory
									})}>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split("/")[2])) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}>
							<button
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}>
								{m._id.secondCategory}
							</button>
							<ul
								className={cn(styles.secondLevelBlock, {
									[styles.secondLevelBlockActive]: m.isOpened
								})}>
								{buildThirdLevel(m.pages, menuItem.route)}
							</ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map(p => (
			<li key={p._id}>
				<Link href={`/${route}/${p.alias}`}>
					<a
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
						})}>
						{p.category}
					</a>
				</Link>
			</li>
		));
	};
	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
