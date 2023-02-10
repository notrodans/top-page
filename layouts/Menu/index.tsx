import { AppContext } from "@context/app.context";
import { firstLevelMenu } from "@helpers/helpers";
import { FirstLevelMenuItem, PageItem } from "@interfaces/menu.interface";
import cn from "classnames";
import { motion, useReducedMotion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, KeyboardEvent, useContext, useState } from "react";
import styles from "./Menu.module.scss";

export const Menu: FC = () => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();
	const shouldReduceMotion = useReducedMotion();

	const router = useRouter();

	const variants: Variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion
				? {}
				: {
						when: "beforeChildren",
						staggerChildren: 0.1
				  }
		},
		hidden: {
			marginBottom: 0
		}
	};

	const variantsChildren: Variants = {
		visible: {
			opacity: 1,
			overflow: "visible",
			height: "auto"
		},
		hidden: {
			opacity: shouldReduceMotion ? 1 : 0,
			overflow: shouldReduceMotion ? "visible" : "hidden",
			height: 0
		}
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu?.(
			menu.map(m => {
				if (m._id.secondCategory === secondCategory) {
					setAnnounce(m.isOpened ? "closed" : "opened");
					m.isOpened = !m.isOpened;
				}
				return m;
			})
		);
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == "Space" || key.code == "Enter") {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
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
										[styles.firstLevelOpened]: m.id == firstCategory
									})}
								>
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
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
								aria-expanded={m.isOpened}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? "visible" : "hidden"}
								animate={m.isOpened ? "visible" : "hidden"}
								className={styles.secondLevelBlock}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return pages.map(p => (
			<motion.li
				key={p._id}
				whileFocus={{ color: "var(--primary)" }}
				whileHover={{ color: "var(--primary)" }}
				variants={variantsChildren}
			>
				<Link href={`/${route}/${p.alias}`}>
					<a
						aria-current={
							`/${route}/${p.alias}` === router.asPath.replace("#ref", "") ? "page" : false
						}
						tabIndex={isOpened ? 0 : -1}
						className={cn(styles.thirdLevel, {
							[styles.thirdLevelActive]:
								`/${route}/${p.alias}` === router.asPath.replace("#ref", "")
						})}
					>
						{p.category}
					</a>
				</Link>
			</motion.li>
		));
	};
	return (
		<nav role='navigation' className={styles.menu}>
			{announce && (
				<span role={"log"} className='visuallyHidden'>
					{announce === "opened" ? "развёрнуто" : "свёрнуто"}
				</span>
			)}
			{buildFirstLevel()}
		</nav>
	);
};
