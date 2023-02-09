import { Up } from "@components/common";
import { AppContextProvider, IAppContext } from "@context/app.context";
import { Footer } from "@layouts/Footer";
import { Header } from "@layouts/Header";
import { Sidebar } from "@layouts/Sidebar";
import cn from "classnames";
import { motion } from "framer-motion";
import { FC, forwardRef, KeyboardEvent, useRef, useState } from "react";
import { WrapperProps } from "./Wrapper.interface";
import styles from "./Wrapper.module.scss";

export const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => {
	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);

	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent) => {
		if (key.code === "Space" || key.code === "Enter") {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return (
		<div ref={ref} className={styles.wrapper}>
			<a
				onFocus={() => setIsSkipLinkDisplayed(true)}
				tabIndex={0}
				className={cn(styles.skipLink, {
					[styles.displayed]: isSkipLinkDisplayed
				})}
				onKeyDown={skipContentAction}
			>
				Сразу к содержанию
			</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<motion.main
				ref={bodyRef}
				tabIndex={0}
				className={styles.body}
				initial={{ opacity: 0, transform: "translateY(15px)" }}
				animate={{ opacity: 1, transform: "translateY(0px)" }}
				exit={{ opacity: 0, transform: "translateY(15px)" }}
				transition={{
					stiffness: 300
				}}
				role='main'
			>
				{children}
			</motion.main>
			<Footer className={styles.footer} />
			<Up />
		</div>
	);
});

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FC<T>) => {
	return function withLayoutComponent(props: T) {
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Wrapper>
					<Component {...props} />
				</Wrapper>
			</AppContextProvider>
		);
	};
};
